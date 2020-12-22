export interface CastToArrayBuffer {
  toArrayBuffer(): ArrayBuffer;
}

export type CanCastToArrayBuffer = ArrayBuffer | CastToArrayBuffer;

export interface CreateOptions {
  validate?: boolean;
}

export interface UnionType {
  type: string;
  value: any;
}

export function SerializeByte32Opt(value: CanCastToArrayBuffer | null): ArrayBuffer;
export class Byte32Opt {
  constructor(reader: CanCastToArrayBuffer, options?: CreateOptions);
  validate(compatible?: boolean): void;
  value(): Byte32;
  hasValue(): boolean;
}

export function SerializeByte20(value: CanCastToArrayBuffer): ArrayBuffer;
export class Byte20 {
  constructor(reader: CanCastToArrayBuffer, options?: CreateOptions);
  validate(compatible?: boolean): void;
  indexAt(i: number): number;
  raw(): ArrayBuffer;
  static size(): Number;
}

export function SerializeSignature(value: CanCastToArrayBuffer): ArrayBuffer;
export class Signature {
  constructor(reader: CanCastToArrayBuffer, options?: CreateOptions);
  validate(compatible?: boolean): void;
  indexAt(i: number): number;
  raw(): ArrayBuffer;
  static size(): Number;
}

export function SerializeBlockMerkleState(value: object): ArrayBuffer;
export class BlockMerkleState {
  constructor(reader: CanCastToArrayBuffer, options?: CreateOptions);
  validate(compatible?: boolean): void;
  static size(): Number;
  getMerkleRoot(): Byte32;
  getCount(): Uint64;
}

export function SerializeAccountMerkleState(value: object): ArrayBuffer;
export class AccountMerkleState {
  constructor(reader: CanCastToArrayBuffer, options?: CreateOptions);
  validate(compatible?: boolean): void;
  static size(): Number;
  getMerkleRoot(): Byte32;
  getCount(): Uint32;
}

export function SerializeGlobalState(value: object): ArrayBuffer;
export class GlobalState {
  constructor(reader: CanCastToArrayBuffer, options?: CreateOptions);
  validate(compatible?: boolean): void;
  getAccount(): AccountMerkleState;
  getBlock(): BlockMerkleState;
  getStatus(): Status;
}

export function SerializeStatus(value: UnionType): ArrayBuffer;
export class Status {
  constructor(reader: CanCastToArrayBuffer, options?: CreateOptions);
  validate(compatible?: boolean): void;
  unionType(): string;
  value(): any;
}

export function SerializeRunning(value: object): ArrayBuffer;
export class Running {
  constructor(reader: CanCastToArrayBuffer, options?: CreateOptions);
  validate(compatible?: boolean): void;
}

export function SerializeReverting(value: object): ArrayBuffer;
export class Reverting {
  constructor(reader: CanCastToArrayBuffer, options?: CreateOptions);
  validate(compatible?: boolean): void;
  static size(): Number;
  getNextBlockNumber(): Uint64;
  getChallengerId(): Uint32;
}

export function SerializeAccount(value: object): ArrayBuffer;
export class Account {
  constructor(reader: CanCastToArrayBuffer, options?: CreateOptions);
  validate(compatible?: boolean): void;
  static size(): Number;
  getId(): Uint32;
  getNonce(): Uint32;
  getScriptHash(): Byte32;
}

export function SerializeRawL2Transaction(value: object): ArrayBuffer;
export class RawL2Transaction {
  constructor(reader: CanCastToArrayBuffer, options?: CreateOptions);
  validate(compatible?: boolean): void;
  getFromId(): Uint32;
  getToId(): Uint32;
  getNonce(): Uint32;
  getArgs(): Bytes;
}

export function SerializeL2Transaction(value: object): ArrayBuffer;
export class L2Transaction {
  constructor(reader: CanCastToArrayBuffer, options?: CreateOptions);
  validate(compatible?: boolean): void;
  getRaw(): RawL2Transaction;
  getSignature(): Signature;
}

export function SerializeL2TransactionVec(value: Array<object>): ArrayBuffer;
export class L2TransactionVec {
  constructor(reader: CanCastToArrayBuffer, options?: CreateOptions);
  validate(compatible?: boolean): void;
  indexAt(i: number): L2Transaction;
  length(): number;
}

export function SerializeRawL2Block(value: object): ArrayBuffer;
export class RawL2Block {
  constructor(reader: CanCastToArrayBuffer, options?: CreateOptions);
  validate(compatible?: boolean): void;
  getNumber(): Uint64;
  getAggregatorId(): Uint32;
  getStakeCellOwnerLockHash(): Byte32;
  getTimestamp(): Uint64;
  getPrevAccount(): AccountMerkleState;
  getPostAccount(): AccountMerkleState;
  getSubmitTransactions(): SubmitTransactionsOpt;
}

export function SerializeL2Block(value: object): ArrayBuffer;
export class L2Block {
  constructor(reader: CanCastToArrayBuffer, options?: CreateOptions);
  validate(compatible?: boolean): void;
  getRaw(): RawL2Block;
  getSignature(): Signature;
  getKvState(): KVPairVec;
  getKvStateProof(): Bytes;
  getTransactions(): L2TransactionVec;
  getBlockProof(): Bytes;
}

export function SerializeSubmitTransactions(value: object): ArrayBuffer;
export class SubmitTransactions {
  constructor(reader: CanCastToArrayBuffer, options?: CreateOptions);
  validate(compatible?: boolean): void;
  getTxWitnessRoot(): Byte32;
  getTxCount(): Uint32;
  getCompactedPostRootList(): Byte32Vec;
}

export function SerializeLeave(value: object): ArrayBuffer;
export class Leave {
  constructor(reader: CanCastToArrayBuffer, options?: CreateOptions);
  validate(compatible?: boolean): void;
}

export function SerializeRevertChain(value: object): ArrayBuffer;
export class RevertChain {
  constructor(reader: CanCastToArrayBuffer, options?: CreateOptions);
  validate(compatible?: boolean): void;
  static size(): Number;
  getReverterId(): Uint32;
  getInvalidBlockNumber(): Uint64;
  getPostAccount(): AccountMerkleState;
}

export function SerializeLeaveOpt(value: object | null): ArrayBuffer;
export class LeaveOpt {
  constructor(reader: CanCastToArrayBuffer, options?: CreateOptions);
  validate(compatible?: boolean): void;
  value(): Leave;
  hasValue(): boolean;
}

export function SerializeRevertChainOpt(value: object | null): ArrayBuffer;
export class RevertChainOpt {
  constructor(reader: CanCastToArrayBuffer, options?: CreateOptions);
  validate(compatible?: boolean): void;
  value(): RevertChain;
  hasValue(): boolean;
}

export function SerializeSubmitTransactionsOpt(value: object | null): ArrayBuffer;
export class SubmitTransactionsOpt {
  constructor(reader: CanCastToArrayBuffer, options?: CreateOptions);
  validate(compatible?: boolean): void;
  value(): SubmitTransactions;
  hasValue(): boolean;
}

export function SerializeKVPair(value: object): ArrayBuffer;
export class KVPair {
  constructor(reader: CanCastToArrayBuffer, options?: CreateOptions);
  validate(compatible?: boolean): void;
  getK(): Byte32;
  getV(): Byte32;
}

export function SerializeKVPairVec(value: Array<object>): ArrayBuffer;
export class KVPairVec {
  constructor(reader: CanCastToArrayBuffer, options?: CreateOptions);
  validate(compatible?: boolean): void;
  indexAt(i: number): KVPair;
  length(): number;
}

export function SerializeBlockInfo(value: object): ArrayBuffer;
export class BlockInfo {
  constructor(reader: CanCastToArrayBuffer, options?: CreateOptions);
  validate(compatible?: boolean): void;
  static size(): Number;
  getAggregatorId(): Uint32;
  getNumber(): Uint64;
  getTimestamp(): Uint64;
}

export function SerializeVerificationContext(value: object): ArrayBuffer;
export class VerificationContext {
  constructor(reader: CanCastToArrayBuffer, options?: CreateOptions);
  validate(compatible?: boolean): void;
  getBlockInfo(): BlockInfo;
  getTransaction(): RawL2Transaction;
  getInputs(): KVPairVec;
  getPrevAccountState(): Byte32;
  getPostAccountState(): Byte32;
  getReturnDataHash(): Byte32;
  getProof(): Bytes;
}

export function SerializeDepositionLockArgs(value: object): ArrayBuffer;
export class DepositionLockArgs {
  constructor(reader: CanCastToArrayBuffer, options?: CreateOptions);
  validate(compatible?: boolean): void;
  getRollupTypeHash(): Byte32;
  getLayer2Lock(): Script;
  getCancelTimeout(): Uint64;
  getOwnerLockHash(): Byte32;
}

export function SerializeStakeLockArgs(value: object): ArrayBuffer;
export class StakeLockArgs {
  constructor(reader: CanCastToArrayBuffer, options?: CreateOptions);
  validate(compatible?: boolean): void;
  static size(): Number;
  getRollupTypeHash(): Byte32;
  getOwnerLockHash(): Byte32;
  getSigningPubkeyHash(): Byte20;
  getFinalizeBlockNumber(): Uint64;
}

export function SerializeMetaContractArgs(value: UnionType): ArrayBuffer;
export class MetaContractArgs {
  constructor(reader: CanCastToArrayBuffer, options?: CreateOptions);
  validate(compatible?: boolean): void;
  unionType(): string;
  value(): any;
}

export function SerializeCreateAccount(value: object): ArrayBuffer;
export class CreateAccount {
  constructor(reader: CanCastToArrayBuffer, options?: CreateOptions);
  validate(compatible?: boolean): void;
  getScript(): Script;
}

export function SerializeSUDTArgs(value: UnionType): ArrayBuffer;
export class SUDTArgs {
  constructor(reader: CanCastToArrayBuffer, options?: CreateOptions);
  validate(compatible?: boolean): void;
  unionType(): string;
  value(): any;
}

export function SerializeSUDTQuery(value: object): ArrayBuffer;
export class SUDTQuery {
  constructor(reader: CanCastToArrayBuffer, options?: CreateOptions);
  validate(compatible?: boolean): void;
  static size(): Number;
  getAccountId(): Uint32;
}

export function SerializeSUDTTransfer(value: object): ArrayBuffer;
export class SUDTTransfer {
  constructor(reader: CanCastToArrayBuffer, options?: CreateOptions);
  validate(compatible?: boolean): void;
  static size(): Number;
  getTo(): Uint32;
  getAmount(): Uint128;
  getFee(): Uint128;
}

export function SerializeSUDTPrepareWithdrawal(value: object): ArrayBuffer;
export class SUDTPrepareWithdrawal {
  constructor(reader: CanCastToArrayBuffer, options?: CreateOptions);
  validate(compatible?: boolean): void;
  static size(): Number;
  getWithdrawalLockHash(): Byte32;
  getAmount(): Uint128;
  getFee(): Uint128;
}

export function SerializeStartChallenge(value: object): ArrayBuffer;
export class StartChallenge {
  constructor(reader: CanCastToArrayBuffer, options?: CreateOptions);
  validate(compatible?: boolean): void;
  static size(): Number;
  getBlockHash(): Byte32;
  getBlockNumber(): Uint64;
  getTxIndex(): Uint32;
}

export function SerializeCancelChallenge(value: object): ArrayBuffer;
export class CancelChallenge {
  constructor(reader: CanCastToArrayBuffer, options?: CreateOptions);
  validate(compatible?: boolean): void;
  getL2Block(): L2Block;
  getBlockProof(): Bytes;
  getKvState(): KVPairVec;
  getKvStateProof(): Bytes;
}

export function SerializeUint32(value: CanCastToArrayBuffer): ArrayBuffer;
export class Uint32 {
  constructor(reader: CanCastToArrayBuffer, options?: CreateOptions);
  validate(compatible?: boolean): void;
  indexAt(i: number): number;
  raw(): ArrayBuffer;
  toBigEndianUint32(): number;
  toLittleEndianUint32(): number;
  static size(): Number;
}

export function SerializeUint64(value: CanCastToArrayBuffer): ArrayBuffer;
export class Uint64 {
  constructor(reader: CanCastToArrayBuffer, options?: CreateOptions);
  validate(compatible?: boolean): void;
  indexAt(i: number): number;
  raw(): ArrayBuffer;
  toBigEndianUint64(): BigInt;
  toLittleEndianUint64(): BigInt;
  static size(): Number;
}

export function SerializeUint128(value: CanCastToArrayBuffer): ArrayBuffer;
export class Uint128 {
  constructor(reader: CanCastToArrayBuffer, options?: CreateOptions);
  validate(compatible?: boolean): void;
  indexAt(i: number): number;
  raw(): ArrayBuffer;
  static size(): Number;
}

export function SerializeByte32(value: CanCastToArrayBuffer): ArrayBuffer;
export class Byte32 {
  constructor(reader: CanCastToArrayBuffer, options?: CreateOptions);
  validate(compatible?: boolean): void;
  indexAt(i: number): number;
  raw(): ArrayBuffer;
  static size(): Number;
}

export function SerializeUint256(value: CanCastToArrayBuffer): ArrayBuffer;
export class Uint256 {
  constructor(reader: CanCastToArrayBuffer, options?: CreateOptions);
  validate(compatible?: boolean): void;
  indexAt(i: number): number;
  raw(): ArrayBuffer;
  static size(): Number;
}

export function SerializeBytes(value: CanCastToArrayBuffer): ArrayBuffer;
export class Bytes {
  constructor(reader: CanCastToArrayBuffer, options?: CreateOptions);
  validate(compatible?: boolean): void;
  indexAt(i: number): number;
  raw(): ArrayBuffer;
  length(): number;
}

export function SerializeBytesOpt(value: CanCastToArrayBuffer | null): ArrayBuffer;
export class BytesOpt {
  constructor(reader: CanCastToArrayBuffer, options?: CreateOptions);
  validate(compatible?: boolean): void;
  value(): Bytes;
  hasValue(): boolean;
}

export function SerializeBytesVec(value: Array<CanCastToArrayBuffer>): ArrayBuffer;
export class BytesVec {
  constructor(reader: CanCastToArrayBuffer, options?: CreateOptions);
  validate(compatible?: boolean): void;
  indexAt(i: number): Bytes;
  length(): number;
}

export function SerializeByte32Vec(value: Array<CanCastToArrayBuffer>): ArrayBuffer;
export class Byte32Vec {
  constructor(reader: CanCastToArrayBuffer, options?: CreateOptions);
  validate(compatible?: boolean): void;
  indexAt(i: number): Byte32;
  length(): number;
}

export function SerializeScriptOpt(value: object | null): ArrayBuffer;
export class ScriptOpt {
  constructor(reader: CanCastToArrayBuffer, options?: CreateOptions);
  validate(compatible?: boolean): void;
  value(): Script;
  hasValue(): boolean;
}

export function SerializeProposalShortId(value: CanCastToArrayBuffer): ArrayBuffer;
export class ProposalShortId {
  constructor(reader: CanCastToArrayBuffer, options?: CreateOptions);
  validate(compatible?: boolean): void;
  indexAt(i: number): number;
  raw(): ArrayBuffer;
  static size(): Number;
}

export function SerializeUncleBlockVec(value: Array<object>): ArrayBuffer;
export class UncleBlockVec {
  constructor(reader: CanCastToArrayBuffer, options?: CreateOptions);
  validate(compatible?: boolean): void;
  indexAt(i: number): UncleBlock;
  length(): number;
}

export function SerializeTransactionVec(value: Array<object>): ArrayBuffer;
export class TransactionVec {
  constructor(reader: CanCastToArrayBuffer, options?: CreateOptions);
  validate(compatible?: boolean): void;
  indexAt(i: number): Transaction;
  length(): number;
}

export function SerializeProposalShortIdVec(value: Array<CanCastToArrayBuffer>): ArrayBuffer;
export class ProposalShortIdVec {
  constructor(reader: CanCastToArrayBuffer, options?: CreateOptions);
  validate(compatible?: boolean): void;
  indexAt(i: number): ProposalShortId;
  length(): number;
}

export function SerializeCellDepVec(value: Array<object>): ArrayBuffer;
export class CellDepVec {
  constructor(reader: CanCastToArrayBuffer, options?: CreateOptions);
  validate(compatible?: boolean): void;
  indexAt(i: number): CellDep;
  length(): number;
}

export function SerializeCellInputVec(value: Array<object>): ArrayBuffer;
export class CellInputVec {
  constructor(reader: CanCastToArrayBuffer, options?: CreateOptions);
  validate(compatible?: boolean): void;
  indexAt(i: number): CellInput;
  length(): number;
}

export function SerializeCellOutputVec(value: Array<object>): ArrayBuffer;
export class CellOutputVec {
  constructor(reader: CanCastToArrayBuffer, options?: CreateOptions);
  validate(compatible?: boolean): void;
  indexAt(i: number): CellOutput;
  length(): number;
}

export function SerializeScript(value: object): ArrayBuffer;
export class Script {
  constructor(reader: CanCastToArrayBuffer, options?: CreateOptions);
  validate(compatible?: boolean): void;
  getCodeHash(): Byte32;
  getHashType(): number;
  getArgs(): Bytes;
}

export function SerializeOutPoint(value: object): ArrayBuffer;
export class OutPoint {
  constructor(reader: CanCastToArrayBuffer, options?: CreateOptions);
  validate(compatible?: boolean): void;
  static size(): Number;
  getTxHash(): Byte32;
  getIndex(): Uint32;
}

export function SerializeCellInput(value: object): ArrayBuffer;
export class CellInput {
  constructor(reader: CanCastToArrayBuffer, options?: CreateOptions);
  validate(compatible?: boolean): void;
  static size(): Number;
  getSince(): Uint64;
  getPreviousOutput(): OutPoint;
}

export function SerializeCellOutput(value: object): ArrayBuffer;
export class CellOutput {
  constructor(reader: CanCastToArrayBuffer, options?: CreateOptions);
  validate(compatible?: boolean): void;
  getCapacity(): Uint64;
  getLock(): Script;
  getType(): ScriptOpt;
}

export function SerializeCellDep(value: object): ArrayBuffer;
export class CellDep {
  constructor(reader: CanCastToArrayBuffer, options?: CreateOptions);
  validate(compatible?: boolean): void;
  static size(): Number;
  getOutPoint(): OutPoint;
  getDepType(): number;
}

export function SerializeRawTransaction(value: object): ArrayBuffer;
export class RawTransaction {
  constructor(reader: CanCastToArrayBuffer, options?: CreateOptions);
  validate(compatible?: boolean): void;
  getVersion(): Uint32;
  getCellDeps(): CellDepVec;
  getHeaderDeps(): Byte32Vec;
  getInputs(): CellInputVec;
  getOutputs(): CellOutputVec;
  getOutputsData(): BytesVec;
}

export function SerializeTransaction(value: object): ArrayBuffer;
export class Transaction {
  constructor(reader: CanCastToArrayBuffer, options?: CreateOptions);
  validate(compatible?: boolean): void;
  getRaw(): RawTransaction;
  getWitnesses(): BytesVec;
}

export function SerializeRawHeader(value: object): ArrayBuffer;
export class RawHeader {
  constructor(reader: CanCastToArrayBuffer, options?: CreateOptions);
  validate(compatible?: boolean): void;
  static size(): Number;
  getVersion(): Uint32;
  getCompactTarget(): Uint32;
  getTimestamp(): Uint64;
  getNumber(): Uint64;
  getEpoch(): Uint64;
  getParentHash(): Byte32;
  getTransactionsRoot(): Byte32;
  getProposalsHash(): Byte32;
  getUnclesHash(): Byte32;
  getDao(): Byte32;
}

export function SerializeHeader(value: object): ArrayBuffer;
export class Header {
  constructor(reader: CanCastToArrayBuffer, options?: CreateOptions);
  validate(compatible?: boolean): void;
  static size(): Number;
  getRaw(): RawHeader;
  getNonce(): Uint128;
}

export function SerializeUncleBlock(value: object): ArrayBuffer;
export class UncleBlock {
  constructor(reader: CanCastToArrayBuffer, options?: CreateOptions);
  validate(compatible?: boolean): void;
  getHeader(): Header;
  getProposals(): ProposalShortIdVec;
}

export function SerializeBlock(value: object): ArrayBuffer;
export class Block {
  constructor(reader: CanCastToArrayBuffer, options?: CreateOptions);
  validate(compatible?: boolean): void;
  getHeader(): Header;
  getUncles(): UncleBlockVec;
  getTransactions(): TransactionVec;
  getProposals(): ProposalShortIdVec;
}

export function SerializeCellbaseWitness(value: object): ArrayBuffer;
export class CellbaseWitness {
  constructor(reader: CanCastToArrayBuffer, options?: CreateOptions);
  validate(compatible?: boolean): void;
  getLock(): Script;
  getMessage(): Bytes;
}

export function SerializeWitnessArgs(value: object): ArrayBuffer;
export class WitnessArgs {
  constructor(reader: CanCastToArrayBuffer, options?: CreateOptions);
  validate(compatible?: boolean): void;
  getLock(): BytesOpt;
  getInputType(): BytesOpt;
  getOutputType(): BytesOpt;
}

