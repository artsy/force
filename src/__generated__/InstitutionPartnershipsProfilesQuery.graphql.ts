/**
 * @generated SignedSource<<5cc839696db396036376b5684534e09b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type InstitutionPartnershipsProfilesQuery$variables = Record<PropertyKey, never>;
export type InstitutionPartnershipsProfilesQuery$data = {
  readonly orderedSet: {
    readonly " $fragmentSpreads": FragmentRefs<"InstitutionPartnershipsProfiles_orderedSet">;
  } | null | undefined;
};
export type InstitutionPartnershipsProfilesQuery = {
  response: InstitutionPartnershipsProfilesQuery$data;
  variables: InstitutionPartnershipsProfilesQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "62ace82dd1b5bd000b4e674e"
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
  "name": "internalID",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v6 = {
  "kind": "Literal",
  "name": "height",
  "value": 45
},
v7 = {
  "kind": "Literal",
  "name": "width",
  "value": 45
},
v8 = [
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
v9 = [
  (v5/*: any*/)
],
v10 = {
  "kind": "InlineFragment",
  "selections": (v9/*: any*/),
  "type": "Node",
  "abstractKey": "__isNode"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "InstitutionPartnershipsProfilesQuery",
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
            "name": "InstitutionPartnershipsProfiles_orderedSet"
          }
        ],
        "storageKey": "orderedSet(id:\"62ace82dd1b5bd000b4e674e\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "InstitutionPartnershipsProfilesQuery",
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
                  (v2/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": null,
                    "kind": "LinkedField",
                    "name": "owner",
                    "plural": false,
                    "selections": [
                      (v1/*: any*/),
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          (v2/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "type",
                            "storageKey": null
                          },
                          (v3/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "href",
                            "storageKey": null
                          },
                          (v4/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "initials",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": [
                              {
                                "kind": "Literal",
                                "name": "first",
                                "value": 15
                              }
                            ],
                            "concreteType": "LocationConnection",
                            "kind": "LinkedField",
                            "name": "locationsConnection",
                            "plural": false,
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "LocationEdge",
                                "kind": "LinkedField",
                                "name": "edges",
                                "plural": true,
                                "selections": [
                                  {
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "Location",
                                    "kind": "LinkedField",
                                    "name": "node",
                                    "plural": false,
                                    "selections": [
                                      {
                                        "alias": null,
                                        "args": null,
                                        "kind": "ScalarField",
                                        "name": "city",
                                        "storageKey": null
                                      },
                                      (v5/*: any*/)
                                    ],
                                    "storageKey": null
                                  }
                                ],
                                "storageKey": null
                              }
                            ],
                            "storageKey": "locationsConnection(first:15)"
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "PartnerCategory",
                            "kind": "LinkedField",
                            "name": "categories",
                            "plural": true,
                            "selections": [
                              (v4/*: any*/),
                              (v3/*: any*/),
                              (v5/*: any*/)
                            ],
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
                              (v2/*: any*/),
                              {
                                "alias": "avatar",
                                "args": null,
                                "concreteType": "Image",
                                "kind": "LinkedField",
                                "name": "image",
                                "plural": false,
                                "selections": [
                                  {
                                    "alias": null,
                                    "args": [
                                      (v6/*: any*/),
                                      (v7/*: any*/)
                                    ],
                                    "concreteType": "CroppedImageUrl",
                                    "kind": "LinkedField",
                                    "name": "cropped",
                                    "plural": false,
                                    "selections": (v8/*: any*/),
                                    "storageKey": "cropped(height:45,width:45)"
                                  }
                                ],
                                "storageKey": null
                              },
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
                                      (v6/*: any*/),
                                      {
                                        "kind": "Literal",
                                        "name": "version",
                                        "value": [
                                          "untouched-png",
                                          "large",
                                          "square"
                                        ]
                                      },
                                      (v7/*: any*/)
                                    ],
                                    "concreteType": "CroppedImageUrl",
                                    "kind": "LinkedField",
                                    "name": "cropped",
                                    "plural": false,
                                    "selections": (v8/*: any*/),
                                    "storageKey": "cropped(height:45,version:[\"untouched-png\",\"large\",\"square\"],width:45)"
                                  }
                                ],
                                "storageKey": null
                              },
                              (v5/*: any*/),
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
                                        "value": 334
                                      },
                                      {
                                        "kind": "Literal",
                                        "name": "version",
                                        "value": [
                                          "wide",
                                          "large",
                                          "featured",
                                          "larger"
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
                                    "selections": (v8/*: any*/),
                                    "storageKey": "cropped(height:334,version:[\"wide\",\"large\",\"featured\",\"larger\"],width:445)"
                                  }
                                ],
                                "storageKey": null
                              }
                            ],
                            "storageKey": null
                          }
                        ],
                        "type": "Partner",
                        "abstractKey": null
                      },
                      (v10/*: any*/),
                      {
                        "kind": "InlineFragment",
                        "selections": (v9/*: any*/),
                        "type": "FairOrganizer",
                        "abstractKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  (v5/*: any*/)
                ],
                "type": "Profile",
                "abstractKey": null
              },
              (v10/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": (v9/*: any*/),
                "type": "FeaturedLink",
                "abstractKey": null
              }
            ],
            "storageKey": null
          },
          (v5/*: any*/)
        ],
        "storageKey": "orderedSet(id:\"62ace82dd1b5bd000b4e674e\")"
      }
    ]
  },
  "params": {
    "cacheID": "f070677a5e86cad29e475bc85017ba4c",
    "id": null,
    "metadata": {},
    "name": "InstitutionPartnershipsProfilesQuery",
    "operationKind": "query",
    "text": "query InstitutionPartnershipsProfilesQuery {\n  orderedSet(id: \"62ace82dd1b5bd000b4e674e\") {\n    ...InstitutionPartnershipsProfiles_orderedSet\n    id\n  }\n}\n\nfragment CellPartner_partner on Partner {\n  ...EntityHeaderPartner_partner\n  internalID\n  slug\n  name\n  href\n  initials\n  locationsConnection(first: 15) {\n    edges {\n      node {\n        city\n        id\n      }\n    }\n  }\n  categories {\n    name\n    slug\n    id\n  }\n  profile {\n    image {\n      cropped(width: 445, height: 334, version: [\"wide\", \"large\", \"featured\", \"larger\"]) {\n        src\n        srcSet\n      }\n    }\n    id\n  }\n}\n\nfragment EntityHeaderPartner_partner on Partner {\n  internalID\n  type\n  slug\n  href\n  name\n  initials\n  locationsConnection(first: 15) {\n    edges {\n      node {\n        city\n        id\n      }\n    }\n  }\n  categories {\n    name\n    slug\n    id\n  }\n  profile {\n    internalID\n    avatar: image {\n      cropped(width: 45, height: 45) {\n        src\n        srcSet\n      }\n    }\n    icon {\n      cropped(width: 45, height: 45, version: [\"untouched-png\", \"large\", \"square\"]) {\n        src\n        srcSet\n      }\n    }\n    id\n  }\n}\n\nfragment InstitutionPartnershipsProfiles_orderedSet on OrderedSet {\n  items {\n    __typename\n    ... on Profile {\n      internalID\n      owner {\n        __typename\n        ... on Partner {\n          ...CellPartner_partner\n        }\n        ... on Node {\n          __isNode: __typename\n          id\n        }\n        ... on FairOrganizer {\n          id\n        }\n      }\n      id\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n    ... on FeaturedLink {\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "07651e28356d9d2cf349d5f757b497fb";

export default node;
