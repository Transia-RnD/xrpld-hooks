require('../../utils-tests.js').TestRig('ws://localhost:6005').then(t=>{
    const holder1 =  t.randomAccount();
    const issuer = t.randomAccount();

    

    t.fundFromGenesis([issuer, holder1]).then(()=>
    {
        t.feeSubmitAccept(issuer.seed,
        {
            Account: issuer.classicAddress,
            TransactionType: "SetHook",
            Hooks: [
                {
                    Hook:
                    {
                        CreateCode: t.wasm('aaw.wasm'),
                        HookApiVersion: 0,
                        HookNamespace: "DEADBEEFDEADBEEFDEADBEEFDEADBEEFDEADBEEFDEADBEEFDEADBEEFDEADBEEF",
                        HookOn: "0000000000000000",
                        Flags: t.hsfCOLLECT
                    }
                }
            ]
        }).then(x=>
        {
            t.assertTxnSuccess(x)
            console.log(x);

            t.feeSubmitAccept(issuer.seed,
            {
                Account: issuer.classicAddress,
                TransactionType: "AccountSet",
                SetFlag: t.asfTshCollect
            }).then(x=>
            {
                t.assertTxnSuccess(x);
                console.log(x);

                t.feeSubmitAccept(holder1.seed,
                {
                    Account: holder1.classicAddress,
                    TransactionType: "TrustSet",
                    LimitAmount: {
                        "currency": "IOU",
                        "issuer": issuer.classicAddress,
                        "value": "1000"
                    }
                }).then(x=>
                {
                    t.assertTxnSuccess(x)
                    console.log(x);
                    t.fetchMetaHookExecutions(x, t.wasmHash('aaw.wasm')).then(m=>
                    {
                        t.assert(m.length == 1, "needed exactly one hook execution");
                        t.assert(m[0].HookReturnCode == 100, "non-weak execution");
                        console.log(m);
                        process.exit(0);
                    });
                }).catch(t.err);
            }).catch(t.err);
        });
    }).catch(t.err);
})



