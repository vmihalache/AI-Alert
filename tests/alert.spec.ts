import { test, expect } from '@playwright/test';
import { Ingestion } from '../src/Ingestion';

test('ingests data from weather API', async () => {
  const ingestion = new Ingestion();
  await ingestion.ingestDataFromWeatherAPi();
});


