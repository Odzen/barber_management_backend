import { expect, describe, test } from '@jest/globals'
import app from '../server'
describe('',()=>{
    test('Server starts successfully', async () => {
        const server = await app.listen(3000)
        expect(server).toBeDefined()
        server.close()
      })
})
    

