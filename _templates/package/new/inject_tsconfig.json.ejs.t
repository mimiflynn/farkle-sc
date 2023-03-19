---
inject: true
to: tsconfig.json
after: paths
---
            "@fsc/<%= name %>/*": [
                    "./packages/<%= name %>/*"
            ],