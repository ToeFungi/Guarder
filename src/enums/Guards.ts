import { NullGuard } from '../guards/NullGuard'
import { EmptyGuard } from '../guards/EmptyGuard'
import { FalsyGuard } from '../guards/FalsyGuard'
import { NegativeGuard } from '../guards/NegativeGuard'
import { UndefinedGuard } from '../guards/UndefinedGuard'
import { WhitespaceGuard } from '../guards/WhitespaceGuard'

/**
 * Enumerated list of official Guards
 */
enum Guards {
  NULL_GUARD = NullGuard,
  EMPTY_GUARD = EmptyGuard,
  FALSY_GUARD = FalsyGuard,
  NEGATIVE_GUARD = NegativeGuard,
  UNDEFINED_GUARD = UndefinedGuard,
  WHITESPACE_GUARD = WhitespaceGuard
}

export { Guards }
