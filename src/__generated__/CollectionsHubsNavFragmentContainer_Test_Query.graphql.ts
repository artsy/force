/**
 * @generated SignedSource<<453acf263ff0e4e67ca094ae206d0499>>
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
  "kind": "Literal",
  "name": "height",
  "value": 218
},
v4 = {
  "kind": "Literal",
  "name": "width",
  "value": 387
},
v5 = [
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
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v7 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v8 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Image"
},
v9 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "CroppedImageUrl"
},
v10 = {
  "enumValues": null,
  "nullable": false,
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
            "concreteType": "Image",
            "kind": "LinkedField",
            "name": "thumbnailImage",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": [
                  (v3/*: any*/),
                  (v4/*: any*/)
                ],
                "concreteType": "CroppedImageUrl",
                "kind": "LinkedField",
                "name": "cropped",
                "plural": false,
                "selections": (v5/*: any*/),
                "storageKey": "cropped(height:218,width:387)"
              }
            ],
            "storageKey": null
          },
          (v6/*: any*/)
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
                  (v3/*: any*/),
                  {
                    "kind": "Literal",
                    "name": "version",
                    "value": [
                      "big_and_tall",
                      "square500",
                      "tall"
                    ]
                  },
                  (v4/*: any*/)
                ],
                "concreteType": "CroppedImageUrl",
                "kind": "LinkedField",
                "name": "cropped",
                "plural": false,
                "selections": (v5/*: any*/),
                "storageKey": "cropped(height:218,version:[\"big_and_tall\",\"square500\",\"tall\"],width:387)"
              }
            ],
            "storageKey": null
          },
          (v6/*: any*/)
        ],
        "storageKey": "genes(slugs:[\"painting\",\"graffiti-and-street-art\"])"
      }
    ]
  },
  "params": {
    "cacheID": "06821d53c783b84e174bee583913c20f",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "genes": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "Gene"
        },
        "genes.id": (v7/*: any*/),
        "genes.image": (v8/*: any*/),
        "genes.image.cropped": (v9/*: any*/),
        "genes.image.cropped.src": (v10/*: any*/),
        "genes.image.cropped.srcSet": (v10/*: any*/),
        "genes.name": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "String"
        },
        "genes.slug": (v7/*: any*/),
        "marketingCollections": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "MarketingCollection"
        },
        "marketingCollections.id": (v7/*: any*/),
        "marketingCollections.slug": (v10/*: any*/),
        "marketingCollections.thumbnailImage": (v8/*: any*/),
        "marketingCollections.thumbnailImage.cropped": (v9/*: any*/),
        "marketingCollections.thumbnailImage.cropped.src": (v10/*: any*/),
        "marketingCollections.thumbnailImage.cropped.srcSet": (v10/*: any*/),
        "marketingCollections.title": (v10/*: any*/)
      }
    },
    "name": "CollectionsHubsNavFragmentContainer_Test_Query",
    "operationKind": "query",
    "text": "query CollectionsHubsNavFragmentContainer_Test_Query {\n  marketingCollections(slugs: [\"contemporary\", \"emerging-art\"]) {\n    ...CollectionsHubsNav_marketingCollections\n    id\n  }\n  genes(slugs: [\"painting\", \"graffiti-and-street-art\"]) {\n    ...CollectionsHubsNav_genes\n    id\n  }\n}\n\nfragment CollectionsHubsNav_genes on Gene {\n  slug\n  name\n  image {\n    cropped(width: 387, height: 218, version: [\"big_and_tall\", \"square500\", \"tall\"]) {\n      src\n      srcSet\n    }\n  }\n}\n\nfragment CollectionsHubsNav_marketingCollections on MarketingCollection {\n  slug\n  title\n  thumbnailImage {\n    cropped(width: 387, height: 218) {\n      src\n      srcSet\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "7618eac9cea68539ca7aac8c0fc417d3";

export default node;
