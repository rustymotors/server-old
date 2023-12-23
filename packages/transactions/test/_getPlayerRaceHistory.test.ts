import { describe, it, expect } from 'vitest';
import { _getPlayerRaceHistory } from '../src/_getPlayerRaceHistory.js';
import { OldServerMessage } from '../../shared/messageFactory.js';
import { mockPino } from '../../../test/factoryMocks.js';
import { getServerLogger } from '../../shared/log.js';

describe('_getPlayerRaceHistory', () => {
    it('should return a PlayerRacingHistoryMessage', async () => {
        const incomingMessage = new OldServerMessage();
        mockPino()
        const result = await _getPlayerRaceHistory({
            connectionId: "0",
            packet: incomingMessage,
            log: getServerLogger({}),
        });

        expect(result).toBeDefined();
    });
});
