/**
 * @generated SignedSource<<24d6e82510b5b3ea4f38baccad452c80>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type collectRoutes_ArtworkFilterQuery$variables = Record<PropertyKey, never>;
export type collectRoutes_ArtworkFilterQuery$data = {
  readonly genes: ReadonlyArray<{
    readonly " $fragmentSpreads": FragmentRefs<"Collect_genes">;
  } | null | undefined> | null | undefined;
  readonly marketingCollections: ReadonlyArray<{
    readonly " $fragmentSpreads": FragmentRefs<"Collect_marketingCollections">;
  }>;
};
export type collectRoutes_ArtworkFilterQuery = {
  response: collectRoutes_ArtworkFilterQuery$data;
  variables: collectRoutes_ArtworkFilterQuery$variables;
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
      "graffiti-and-street-art",
      "photography",
      "20th-century-art"
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
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "collectRoutes_ArtworkFilterQuery",
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
            "name": "Collect_marketingCollections"
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
            "name": "Collect_genes"
          }
        ],
        "storageKey": "genes(slugs:[\"painting\",\"graffiti-and-street-art\",\"photography\",\"20th-century-art\"])"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "collectRoutes_ArtworkFilterQuery",
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
        "storageKey": "genes(slugs:[\"painting\",\"graffiti-and-street-art\",\"photography\",\"20th-century-art\"])"
      }
    ]
  },
  "params": {
    "cacheID": "079002a0b46b590f378b17bb09ac91ff",
    "id": null,
    "metadata": {},
    "name": "collectRoutes_ArtworkFilterQuery",
    "operationKind": "query",
    "text": "query collectRoutes_ArtworkFilterQuery {\n  marketingCollections(slugs: [\"contemporary\", \"emerging-art\"]) {\n    ...Collect_marketingCollections\n    id\n  }\n  genes(slugs: [\"painting\", \"graffiti-and-street-art\", \"photography\", \"20th-century-art\"]) {\n    ...Collect_genes\n    id\n  }\n}\n\nfragment Collect_genes on Gene {\n  ...CollectionsHubsNav_genes\n}\n\nfragment Collect_marketingCollections on MarketingCollection {\n  ...CollectionsHubsNav_marketingCollections\n}\n\nfragment CollectionsHubsNav_genes on Gene {\n  slug\n  name\n  image {\n    cropped(width: 387, height: 218, version: [\"big_and_tall\", \"square500\", \"tall\"]) {\n      src\n      srcSet\n    }\n  }\n}\n\nfragment CollectionsHubsNav_marketingCollections on MarketingCollection {\n  slug\n  title\n  thumbnailImage {\n    cropped(width: 387, height: 218) {\n      src\n      srcSet\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "6ad80d0a0bd38e56d5eb3e935ccfe109";

export default node;
