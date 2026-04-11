import { test } from '@playwright/test';
import httpGateway from '../src/httpGateway';

test('calls ollama', async () => {
httpGateway.fetchData("http://localhost:11434/api/chat", "POST", {"model":"gemma3:1b","messages":[{"role":"user","content":"test"}]});    
});


