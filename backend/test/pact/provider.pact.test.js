const { Verifier } = require('@pact-foundation/pact');
const app = require("../../index");
let server;

describe('Provider pact verification', () => {
  let instance;
  beforeAll(async () => {
    // Start real provider on port 6001, for example
    server = app.listen(6001, () => {
        console.log("Provider running on port 6001");
    });
  });

  afterAll(() => {
    server.close();
  });

  it('validates the expectations of monitoring-system', async () => {
    const verifier = new Verifier({
      provider: 'gold-api',
      providerBaseUrl: 'http://localhost:6001',
      pactBrokerUrl: 'https://vietnam-national-university.pactflow.io',
      pactBrokerToken: 'FhetDP4tQXfYaQPLl6QrBw',
      consumerVersionSelectors: [{ branch: 'main' }],
      providerVersion: '1.0.0',
      publishVerificationResult: true,
      failIfNoPactsFound: true,
      logLevel: 'debug'
    });
    const out = await verifier.verifyProvider();
    console.log('Pact Verification complete:', out);
  });
});
