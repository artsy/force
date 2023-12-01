/**
 * @generated SignedSource<<13b4899707b25fbe1c296afa111247bc>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type InstitutionPartnershipsShowsQuery$variables = Record<PropertyKey, never>;
export type InstitutionPartnershipsShowsQuery$data = {
  readonly orderedSet: {
    readonly " $fragmentSpreads": FragmentRefs<"InstitutionPartnershipsShows_orderedSet">;
  } | null | undefined;
};
export type InstitutionPartnershipsShowsQuery = {
  response: InstitutionPartnershipsShowsQuery$data;
  variables: InstitutionPartnershipsShowsQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "62acd180259556000cd9991f"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = [
  (v3/*: any*/)
],
v5 = {
  "kind": "InlineFragment",
  "selections": (v4/*: any*/),
  "type": "Node",
  "abstractKey": "__isNode"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "InstitutionPartnershipsShowsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "OrderedSet",
        "kind": "LinkedField",
        "name": "orderedSet",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "InstitutionPartnershipsShows_orderedSet"
          }
        ],
        "storageKey": "orderedSet(id:\"62acd180259556000cd9991f\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "InstitutionPartnershipsShowsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "OrderedSet",
        "kind": "LinkedField",
        "name": "orderedSet",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "items",
            "plural": true,
            "selections": [
              (v1/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "internalID",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "slug",
                    "storageKey": null
                  },
                  (v2/*: any*/),
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
                    "kind": "ScalarField",
                    "name": "startAt",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "endAt",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "isFairBooth",
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
                    "concreteType": null,
                    "kind": "LinkedField",
                    "name": "partner",
                    "plural": false,
                    "selections": [
                      (v1/*: any*/),
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          (v2/*: any*/)
                        ],
                        "type": "Partner",
                        "abstractKey": null
                      },
                      (v5/*: any*/),
                      {
                        "kind": "InlineFragment",
                        "selections": (v4/*: any*/),
                        "type": "ExternalPartner",
                        "abstractKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Image",
                    "kind": "LinkedField",
                    "name": "coverImage",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": [
                          {
                            "kind": "Literal",
                            "name": "height",
                            "value": 334
                          },
                          {
                            "kind": "Literal",
                            "name": "version",
                            "value": [
                              "larger",
                              "large"
                            ]
                          },
                          {
                            "kind": "Literal",
                            "name": "width",
                            "value": 445
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
                        "storageKey": "cropped(height:334,version:[\"larger\",\"large\"],width:445)"
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "type": "Show",
                "abstractKey": null
              },
              (v5/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": (v4/*: any*/),
                "type": "FeaturedLink",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": (v4/*: any*/),
                "type": "Profile",
                "abstractKey": null
              }
            ],
            "storageKey": null
          },
          (v3/*: any*/)
        ],
        "storageKey": "orderedSet(id:\"62acd180259556000cd9991f\")"
      }
    ]
  },
  "params": {
    "cacheID": "e72caa7af7d6de95ece6249a273e52cd",
    "id": null,
    "metadata": {},
    "name": "InstitutionPartnershipsShowsQuery",
    "operationKind": "query",
    "text": "query InstitutionPartnershipsShowsQuery {\n  orderedSet(id: \"62acd180259556000cd9991f\") {\n    ...InstitutionPartnershipsShows_orderedSet\n    id\n  }\n}\n\nfragment CellShow_show on Show {\n  internalID\n  slug\n  name\n  href\n  startAt\n  endAt\n  isFairBooth\n  exhibitionPeriod\n  partner {\n    __typename\n    ... on Partner {\n      name\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n    ... on ExternalPartner {\n      id\n    }\n  }\n  coverImage {\n    cropped(width: 445, height: 334, version: [\"larger\", \"large\"]) {\n      src\n      srcSet\n    }\n  }\n}\n\nfragment InstitutionPartnershipsShows_orderedSet on OrderedSet {\n  items {\n    __typename\n    ... on Show {\n      internalID\n      ...CellShow_show\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n    ... on FeaturedLink {\n      id\n    }\n    ... on Profile {\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "6ec5446829adc63cecfdf0ac25f09b06";

export default node;
