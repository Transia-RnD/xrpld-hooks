if (process.argv.length < 5)
{
    console.log("Usage: node pay <source family seed> <amount xrp> <destination account>")
    process.exit(1)
}
const secret  = process.argv[2];
const amount = BigInt(process.argv[3]) * 1000000n
const dest = process.argv[4];

require('../../utils-tests.js').TestRig('ws://localhost:6005').then(t=>
{
    t.pay(secret, amount, dest).then(x=>
    {
        console.log(x);
        process.exit(0);
    });
});


