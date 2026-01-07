/**
 * @generated SignedSource<<4ef636aa33b1bcd57fc71f2dd8ae15bb>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FairApp_Test_Query$variables = Record<PropertyKey, never>;
export type FairApp_Test_Query$data = {
  readonly fair: {
    readonly " $fragmentSpreads": FragmentRefs<"FairApp_fair">;
  } | null | undefined;
};
export type FairApp_Test_Query = {
  response: FairApp_Test_Query$data;
  variables: FairApp_Test_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "example"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v3 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v4 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Image"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "FairApp_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Fair",
        "kind": "LinkedField",
        "name": "fair",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "FairApp_fair"
          }
        ],
        "storageKey": "fair(id:\"example\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "FairApp_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Fair",
        "kind": "LinkedField",
        "name": "fair",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "href",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "FairCounts",
            "kind": "LinkedField",
            "name": "counts",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "artworks",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
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
            "kind": "ScalarField",
            "name": "exhibitionPeriod",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Profile",
            "kind": "LinkedField",
            "name": "profile",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Image",
                "kind": "LinkedField",
                "name": "icon",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": [
                      {
                        "kind": "Literal",
                        "name": "version",
                        "value": [
                          "large",
                          "square",
                          "square140"
                        ]
                      }
                    ],
                    "kind": "ScalarField",
                    "name": "url",
                    "storageKey": "url(version:[\"large\",\"square\",\"square140\"])"
                  }
                ],
                "storageKey": null
              },
              (v1/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "slug",
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
                    "name": "version",
                    "value": "wide"
                  }
                ],
                "kind": "ScalarField",
                "name": "url",
                "storageKey": "url(version:\"wide\")"
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "FairExhibitorsGroup",
            "kind": "LinkedField",
            "name": "exhibitorsGroupedByName",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "letter",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "internalID",
            "storageKey": null
          },
          (v1/*: any*/)
        ],
        "storageKey": "fair(id:\"example\")"
      }
    ]
  },
  "params": {
    "cacheID": "fdfbbb6f1fefe13aa48a097b3c2a322f",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "fair": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Fair"
        },
        "fair.counts": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "FairCounts"
        },
        "fair.counts.artworks": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "FormattedNumber"
        },
        "fair.exhibitionPeriod": (v2/*: any*/),
        "fair.exhibitorsGroupedByName": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "FairExhibitorsGroup"
        },
        "fair.exhibitorsGroupedByName.letter": (v2/*: any*/),
        "fair.href": (v2/*: any*/),
        "fair.id": (v3/*: any*/),
        "fair.image": (v4/*: any*/),
        "fair.image.url": (v2/*: any*/),
        "fair.internalID": (v3/*: any*/),
        "fair.name": (v2/*: any*/),
        "fair.profile": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Profile"
        },
        "fair.profile.icon": (v4/*: any*/),
        "fair.profile.icon.url": (v2/*: any*/),
        "fair.profile.id": (v3/*: any*/),
        "fair.slug": (v3/*: any*/)
      }
    },
    "name": "FairApp_Test_Query",
    "operationKind": "query",
    "text": "query FairApp_Test_Query {\n  fair(id: \"example\") {\n    ...FairApp_fair\n    id\n  }\n}\n\nfragment ExhibitorsLetterNav_fair on Fair {\n  exhibitorsGroupedByName {\n    letter\n  }\n}\n\nfragment FairApp_fair on Fair {\n  ...FairTabs_fair\n  ...FairHeader_fair\n  ...FairHeaderImage_fair\n  ...ExhibitorsLetterNav_fair\n  internalID\n  profile {\n    id\n  }\n}\n\nfragment FairHeaderImage_fair on Fair {\n  image {\n    url(version: \"wide\")\n  }\n}\n\nfragment FairHeader_fair on Fair {\n  name\n  exhibitionPeriod\n  profile {\n    icon {\n      url(version: [\"large\", \"square\", \"square140\"])\n    }\n    id\n  }\n  slug\n}\n\nfragment FairTabs_fair on Fair {\n  href\n  counts {\n    artworks\n  }\n}\n"
  }
};
})();

(node as any).hash = "0d24d146ba08a426b78f8dada6663446";

export default node;
