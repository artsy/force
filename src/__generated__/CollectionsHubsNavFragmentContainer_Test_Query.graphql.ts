/**
 * @generated SignedSource<<65d13501ce00be8960412bb6dabf281c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CollectionsHubsNavFragmentContainer_Test_Query$variables = Record<PropertyKey, never>;
export type CollectionsHubsNavFragmentContainer_Test_Query$data = {
  readonly genes: ReadonlyArray<{
    readonly " $fragmentSpreads": FragmentRefs<"CollectionsHubsNav_genes">;
  } | null | undefined> | null | undefined;
  readonly marketingCollections: ReadonlyArray<{
    readonly " $fragmentSpreads": FragmentRefs<"CollectionsHubsNav_marketingCollections">;
  }>;
};
export type CollectionsHubsNavFragmentContainer_Test_Query = {
  response: CollectionsHubsNavFragmentContainer_Test_Query$data;
  variables: CollectionsHubsNavFragmentContainer_Test_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "slugs",
    "value": [
      "contemporary",
      "emerging-art"
    ]
  }
],
v1 = [
  {
    "kind": "Literal",
    "name": "slugs",
    "value": [
      "painting",
      "graffiti-and-street-art"
    ]
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v5 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v6 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "CollectionsHubsNavFragmentContainer_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "MarketingCollection",
        "kind": "LinkedField",
        "name": "marketingCollections",
        "plural": true,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "CollectionsHubsNav_marketingCollections"
          }
        ],
        "storageKey": "marketingCollections(slugs:[\"contemporary\",\"emerging-art\"])"
      },
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Gene",
        "kind": "LinkedField",
        "name": "genes",
        "plural": true,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "CollectionsHubsNav_genes"
          }
        ],
        "storageKey": "genes(slugs:[\"painting\",\"graffiti-and-street-art\"])"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "CollectionsHubsNavFragmentContainer_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "MarketingCollection",
        "kind": "LinkedField",
        "name": "marketingCollections",
        "plural": true,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "title",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "thumbnail",
            "storageKey": null
          },
          (v3/*: any*/)
        ],
        "storageKey": "marketingCollections(slugs:[\"contemporary\",\"emerging-art\"])"
      },
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Gene",
        "kind": "LinkedField",
        "name": "genes",
        "plural": true,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "name",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Image",
            "kind": "LinkedField",
            "name": "image",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": [
                  {
                    "kind": "Literal",
                    "name": "height",
                    "value": 218
                  },
                  {
                    "kind": "Literal",
                    "name": "version",
                    "value": [
                      "big_and_tall",
                      "square500",
                      "tall"
                    ]
                  },
                  {
                    "kind": "Literal",
                    "name": "width",
                    "value": 387
                  }
                ],
                "concreteType": "CroppedImageUrl",
                "kind": "LinkedField",
                "name": "cropped",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "src",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "srcSet",
                    "storageKey": null
                  }
                ],
                "storageKey": "cropped(height:218,version:[\"big_and_tall\",\"square500\",\"tall\"],width:387)"
              }
            ],
            "storageKey": null
          },
          (v3/*: any*/)
        ],
        "storageKey": "genes(slugs:[\"painting\",\"graffiti-and-street-art\"])"
      }
    ]
  },
  "params": {
    "cacheID": "27cb00c016cf122223896e68ae010cae",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "genes": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "Gene"
        },
        "genes.id": (v4/*: any*/),
        "genes.image": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Image"
        },
        "genes.image.cropped": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CroppedImageUrl"
        },
        "genes.image.cropped.src": (v5/*: any*/),
        "genes.image.cropped.srcSet": (v5/*: any*/),
        "genes.name": (v6/*: any*/),
        "genes.slug": (v4/*: any*/),
        "marketingCollections": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "MarketingCollection"
        },
        "marketingCollections.id": (v4/*: any*/),
        "marketingCollections.slug": (v5/*: any*/),
        "marketingCollections.thumbnail": (v6/*: any*/),
        "marketingCollections.title": (v5/*: any*/)
      }
    },
    "name": "CollectionsHubsNavFragmentContainer_Test_Query",
    "operationKind": "query",
    "text": "query CollectionsHubsNavFragmentContainer_Test_Query {\n  marketingCollections(slugs: [\"contemporary\", \"emerging-art\"]) {\n    ...CollectionsHubsNav_marketingCollections\n    id\n  }\n  genes(slugs: [\"painting\", \"graffiti-and-street-art\"]) {\n    ...CollectionsHubsNav_genes\n    id\n  }\n}\n\nfragment CollectionsHubsNav_genes on Gene {\n  slug\n  name\n  image {\n    cropped(width: 387, height: 218, version: [\"big_and_tall\", \"square500\", \"tall\"]) {\n      src\n      srcSet\n    }\n  }\n}\n\nfragment CollectionsHubsNav_marketingCollections on MarketingCollection {\n  slug\n  title\n  thumbnail\n}\n"
  }
};
})();

(node as any).hash = "7618eac9cea68539ca7aac8c0fc417d3";

export default node;
