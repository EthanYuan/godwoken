//! gw-setup-tool
//! This tool helps you generate Godwoken config file

use anyhow::{anyhow, Result};
use clap::{crate_version, App, Arg, ArgMatches};
use faster_hex::hex_decode;
use gw_common::blake2b::new_blake2b;
use gw_config::*;
use gw_jsonrpc_types::ckb_jsonrpc_types::{JsonBytes, Script, ScriptHashType};
use std::fs;

const ROLLUP_CONTRACT_PATH: &str = "./build/debug/state-validator";

// Args
const INITIAL_AGGREGATOR_ARGS: &str = "account-args";
const INITIAL_AGGREGATOR_CODE_HASH: &str = "account-code-hash";
const INITIAL_AGGREGATOR_DEPOSITION: &str = "deposition-amount";
const GENESIS_TIMESTAMP: &str = "genesis-timestamp";
const RPC_LISTEN_ADDRESS: &str = "rpc-listen-address";
const LUMOS_CALLBACK_ADDRESS: &str = "lumos-callback-address";
const LUMOS_ENDPOINT: &str = "lumos-endpoint";
const ROLLUP_CONTRACT: &str = "rollup-contract-path";

fn build_cli(help_msg: &mut Vec<u8>) -> Result<ArgMatches> {
    let mut app = App::new("gw-setup-tool")
        .about("This tool helps you generate Godwoken config file")
        .version(crate_version!())
        .subcommand(
            App::new("generate-config")
                .about("generate Godwoken configuration file")
                .arg(
                    Arg::new(INITIAL_AGGREGATOR_ARGS)
                        .about("Args of the initial aggregator")
                        .required(true)
                        .takes_value(true)
                        .long(INITIAL_AGGREGATOR_ARGS),
                )
                .arg(
                    Arg::new(INITIAL_AGGREGATOR_CODE_HASH)
                        .about("Code hash of the initial aggregator")
                        .required(true)
                        .takes_value(true)
                        .long(INITIAL_AGGREGATOR_CODE_HASH),
                )
                .arg(
                    Arg::new(INITIAL_AGGREGATOR_DEPOSITION)
                        .about("Deposition amount of the initial aggregator")
                        .required(true)
                        .takes_value(true)
                        .long(INITIAL_AGGREGATOR_DEPOSITION),
                )
                .arg(
                    Arg::new(GENESIS_TIMESTAMP)
                        .about("Timestamp of the genesis block, represent in unixtime")
                        .required(true)
                        .takes_value(true)
                        .long(GENESIS_TIMESTAMP),
                )
                .arg(
                    Arg::new(RPC_LISTEN_ADDRESS)
                        .about("Aggregator RPC listen address")
                        .required(false)
                        .takes_value(true)
                        .long(RPC_LISTEN_ADDRESS)
                        .default_value("127.0.0.1:3000"),
                )
                .arg(
                    Arg::new(LUMOS_CALLBACK_ADDRESS)
                        .about("Aggregator callback address")
                        .required(false)
                        .takes_value(true)
                        .long(LUMOS_CALLBACK_ADDRESS)
                        .default_value("http://127.0.0.1:3000/callback"),
                )
                .arg(
                    Arg::new(LUMOS_ENDPOINT)
                        .about("lumos API endpoint")
                        .required(false)
                        .takes_value(true)
                        .long(LUMOS_ENDPOINT)
                        .default_value("127.0.0.1:5000"),
                )
                .arg(
                    Arg::new(ROLLUP_CONTRACT)
                        .about("Rollup contract path")
                        .required(false)
                        .takes_value(true)
                        .long(ROLLUP_CONTRACT)
                        .default_value(ROLLUP_CONTRACT_PATH),
                ),
        );
    app.write_long_help(help_msg)?;
    Ok(app.get_matches())
}

fn build_rollup_script(rollup_contract_path: &str) -> Result<Script> {
    let code_hash = {
        let rollup_contract = fs::read(rollup_contract_path)?;
        let mut hasher = new_blake2b();
        hasher.update(&rollup_contract);
        let mut buf = [0u8; 32];
        hasher.finalize(&mut buf);
        buf.into()
    };
    let hash_type = ScriptHashType::Data;
    let args = JsonBytes::default();
    let script = Script {
        code_hash,
        hash_type,
        args,
    };
    Ok(script)
}

fn run() -> Result<()> {
    let mut help_msg = Vec::new();
    let cli_args = build_cli(&mut help_msg)?;
    let args = match cli_args.subcommand() {
        Some(("generate-config", args)) => args,
        Some((subcommand, _args)) => {
            println!("{}", String::from_utf8(help_msg)?);
            return Err(anyhow!("unrecognized subcommand: {}", subcommand));
        }
        None => {
            println!("{}", String::from_utf8(help_msg)?);
            return Err(anyhow!("unrecognized subcommand"));
        }
    };
    let initial_aggregator_args = {
        let args_hex = args.value_of(INITIAL_AGGREGATOR_ARGS).unwrap();
        let args_hex = args_hex.trim_start_matches("0x");
        let mut args = Vec::new();
        args.resize(args_hex.len() / 2, 0);
        hex_decode(args_hex.as_bytes(), &mut args)?;
        args
    };
    let initial_aggregator_code_hash = {
        let code_hash_hex = args.value_of(INITIAL_AGGREGATOR_CODE_HASH).unwrap();
        let code_hash_hex = code_hash_hex.trim_start_matches("0x");
        let mut code_hash = [0u8; 32];
        hex_decode(code_hash_hex.as_bytes(), &mut code_hash)?;
        code_hash
    };
    let initial_aggregator_script = Script {
        code_hash: initial_aggregator_code_hash.into(),
        args: JsonBytes::from_vec(initial_aggregator_args),
        hash_type: ScriptHashType::Data,
    };
    let initial_deposition = args
        .value_of(INITIAL_AGGREGATOR_DEPOSITION)
        .unwrap()
        .parse()?;
    let genesis_timestamp = args.value_of(GENESIS_TIMESTAMP).unwrap().parse()?;
    let rpc_listen_address = args.value_of(RPC_LISTEN_ADDRESS).unwrap();
    let lumos_callback_address = args.value_of(LUMOS_CALLBACK_ADDRESS).unwrap();
    let lumos_endpoint = args.value_of(LUMOS_ENDPOINT).unwrap();
    let rollup_contract_path = args.value_of(ROLLUP_CONTRACT).unwrap();

    // the zero account_id is reserved, so our initial account id is 1
    let initial_account_id = 1;

    let aggregator = AggregatorConfig {
        account_id: initial_account_id,
        signer: SignerConfig {},
    };

    let consensus = ConsensusConfig {
        aggregator_id: initial_account_id,
    };

    let genesis = GenesisConfig {
        initial_aggregator_script,
        initial_deposition,
        timestamp: genesis_timestamp,
    };

    let rollup_type_script = build_rollup_script(rollup_contract_path)?;

    let chain = ChainConfig { rollup_type_script };

    let rpc = RPC {
        listen: rpc_listen_address.to_string(),
    };

    let lumos = Lumos {
        callback: lumos_callback_address.to_string(),
        endpoint: lumos_endpoint.to_string(),
    };

    let config = Config {
        chain,
        consensus,
        rpc,
        lumos,
        genesis,
        aggregator: Some(aggregator),
    };
    let output = toml::to_string_pretty(&config)?;
    println!("{}", output);
    Ok(())
}

fn main() {
    run().expect("error");
}
