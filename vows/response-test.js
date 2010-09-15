var vows = require("vows"),
    fs = require("fs"),
    assert = require("assert"); 

function responseValid (name, expected) {
    return function (topic) {
        var invoked = false;
        var parser = topic.parser(function (error, response) {
            if (error) throw error;
            invoked = true;
            assert.deepEqual(response, expected);
        });
        parser.read(fs.readFileSync(__dirname + "/responses/" + name, "utf8"));
        assert.isTrue(invoked);
    }
}

vows.describe("Response").addBatch({
    "Response can parse": {
        topic: require("__internal/response"),
        "AllocateAddress": responseValid("AllocateAddress",
        { "publicIp": "67.202.55.255"
        }),
        "AttachVolume": responseValid("AttachVolume",
        { volumeId: "vol-4d826724",
          instanceId: "i-6058a509",
          device: "/dev/sdh",
          status: "attaching",
          attachTime: new Date(Date.UTC(2008, 4, 7, 11, 51, 50))
        }),
        "AuthorizeSecurityGroupIngress": responseValid("AuthorizeSecurityGroupIngress", 
        { "return": true
        }),
        "BundleInstance": responseValid("BundleInstance", 
        { requestId: "bun-c1a540a8",
          bundleInstanceTask:
          { instanceId: "i-12345678"
          , bundleId: "bun-c1a540a8"
          , state: "bundling"
          , startTime: new Date(Date.UTC(2008, 9, 7, 11, 41, 50))
          , updateTime: new Date(Date.UTC(2008, 9, 7, 11, 51, 50))
          , progress: "70%"
          , storage:
            { S3:
              { bucket: "my-bucket"
              , prefix: "winami"
              }
            }
          }
        }),
        "CancelBundleTask": responseValid("CancelBundleTask",
        { bundleInstanceTask:
          { instanceId: "i-12345678"
          , bundleId: "bun-cla322b9"
          , state: "canceling"
          , startTime: new Date(Date.UTC(2008, 9, 7, 11, 41, 50))
          , updateTime: new Date(Date.UTC(2008, 9, 7, 11, 51, 50))
          , progress: "20%"
          , storage:
            { S3:
              { bucket: "my-bucket"
              , prefix: "my-new-image"
              }
            }
          }
        }),
        "CancelSpotInstanceRequests": responseValid("CancelSpotInstanceRequests",
        { requestId: "59dbff89-35bd-4eac-99ed-be587ed81825"
        , spotInstanceRequestSet: [ { spotInstanceRequestId: 'sir-e95fae02', state: "cancelled" } ]
        }),
        "ConfirmProductInstance": responseValid("ConfirmProductInstance",
        { ownerId: "254933287430"
        , "return": true
        }),
        "CreateImage": responseValid("CreateImage",
        { imageId: "ami-4fa54026"
        }),
        "CreateKeyPair": responseValid("CreateKeyPair",
        { keyName: "gsg-keypair"
        , keyFingerprint: "1f:51:ae:28:bf:89:e9:d8:1f:25:5d:37:2d:7d:b8:ca:9f:f5:f1:6f"
        , keyMaterial: "-----BEGIN RSA PRIVATE KEY-----\nMIIEoQIBAAKCAQBuLFg5ujHrtm1jnutSuoO8Xe56LlT+HM8v/xkaa39EstM3/aFxTHgElQiJLChp\nHungXQ29VTc8rc1bW0lkdi23OH5eqkMHGhvEwqa0HWASUMll4o3o/IX+0f2UcPoKCOVUR+jx71Sg\n5AU52EQfanIn3ZQ8lFW7Edp5a3q4DhjGlUKToHVbicL5E+g45zfB95wIyywWZfeW/UUF3LpGZyq/\nebIUlq1qTbHkLbCC2r7RTn8vpQWp47BGVYGtGSBMpTRP5hnbzzuqj3itkiLHjU39S2sJCJ0TrJx5\ni8BygR4s3mHKBj8l+ePQxG1kGbF6R4yg6sECmXn17MRQVXODNHZbAgMBAAECggEAY1tsiUsIwDl5\n91CXirkYGuVfLyLflXenxfI50mDFms/mumTqloHO7tr0oriHDR5K7wMcY/YY5YkcXNo7mvUVD1pM\nZNUJs7rw9gZRTrf7LylaJ58kOcyajw8TsC4e4LPbFaHwS1d6K8rXh64o6WgW4SrsB6ICmr1kGQI7\n3wcfgt5ecIu4TZf0OE9IHjn+2eRlsrjBdeORi7KiUNC/pAG23I6MdDOFEQRcCSigCj+4/mciFUSA\nSWS4dMbrpb9FNSIcf9dcLxVM7/6KxgJNfZc9XWzUw77Jg8x92Zd0fVhHOux5IZC+UvSKWB4dyfcI\ntE8C3p9bbU9VGyY5vLCAiIb4qQKBgQDLiO24GXrIkswF32YtBBMuVgLGCwU9h9HlO9mKAc2m8Cm1\njUE5IpzRjTedc9I2qiIMUTwtgnw42auSCzbUeYMURPtDqyQ7p6AjMujp9EPemcSVOK9vXYL0Ptco\nxW9MC0dtV6iPkCN7gOqiZXPRKaFbWADp16p8UAIvS/a5XXk5jwKBgQCKkpHi2EISh1uRkhxljyWC\niDCiK6JBRsMvpLbc0v5dKwP5alo1fmdR5PJaV2qvZSj5CYNpMAy1/EDNTY5OSIJU+0KFmQbyhsbm\nrdLNLDL4+TcnT7c62/aH01ohYaf/VCbRhtLlBfqGoQc7+sAc8vmKkesnF7CqCEKDyF/dhrxYdQKB\ngC0iZzzNAapayz1+JcVTwwEid6j9JqNXbBc+Z2YwMi+T0Fv/P/hwkX/ypeOXnIUcw0Ih/YtGBVAC\nDQbsz7LcY1HqXiHKYNWNvXgwwO+oiChjxvEkSdsTTIfnK4VSCvU9BxDbQHjdiNDJbL6oar92UN7V\nrBYvChJZF7LvUH4YmVpHAoGAbZ2X7XvoeEO+uZ58/BGKOIGHByHBDiXtzMhdJr15HTYjxK7OgTZm\ngK+8zp4L9IbvLGDMJO8vft32XPEWuvI8twCzFH+CsWLQADZMZKSsBasOZ/h1FwhdMgCMcY+Qlzd4\nJZKjTSu3i7vhvx6RzdSedXEMNTZWN4qlIx3kR5aHcukCgYA9T+Zrvm1F0seQPbLknn7EqhXIjBaT\nP8TTvW/6bdPi23ExzxZn7KOdrfclYRph1LHMpAONv/x2xALIf91UB+v5ohy1oDoasL0gij1houRe\n2ERKKdwz0ZL9SWq6VTdhr/5G994CK72fy5WhyERbDjUIdHaK3M849JJuf8cSrvSb4g==\n-----END RSA PRIVATE KEY-----"
        }),
        "CreatePlacementGroup": responseValid("CreatePlacementGroup",
        { requestId: "d4904fd9-82c2-4ea5-adfe-a9cc3EXAMPLE"
        , "return": true
        }),
        "CreateSecurityGroup": responseValid("CreateSecurityGroup", 
        { "return": true
        }),
        "CreateSnapshot": responseValid("CreateSnapshot",
        { snapshotId: "snap-78a54011"
        , volumeId: "vol-4d826724"
        , volumeSize: 10
        , status: "pending"
        , startTime: new Date(Date.UTC(2008, 4, 7, 12, 51, 50))
        , progress: "60%"
        , ownerId: "213457642086"
        , description: "Daily Backup" 
        }),
        "CreateSpotDatafeedSubscription": responseValid("CreateSpotDatafeedSubscription",
        { spotDatafeedSubscription:
          { ownerId: "254933287430"
          , bucket: "my-bucket"
          , prefix: null
          , state: "open"
          }
        }),
        "CreateVolume": responseValid("CreateVolume",
        { volumeId: "vol-4d826724"
        , size: 800
        , status: "creating"
        , createTime: new Date(Date.UTC(2008, 4, 7, 11, 51, 50))
        , availabilityZone: "us-east-1a"
        , snapshotId: null
        }),
        "DeleteKeyPair": responseValid("DeleteKeyPair",
        { "return": true
        }),
        "DeletePlacementGroup": responseValid("DeletePlacementGroup",
        { requestId: "d4904fd9-82c2-4ea5-adfe-a9cc3EXAMPLE"
        , "return": true
        }),
        "DeleteSecurityGroup": responseValid("DeleteSecurityGroup",
        { "return": true
        }),
        "DeleteSnapshot": responseValid("DeleteSnapshot",
        { "return": true
        })
    } 
}).export(module);