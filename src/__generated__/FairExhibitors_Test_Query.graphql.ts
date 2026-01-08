/**
 * @generated SignedSource<<c5441d77005c7f3ee18b7a95057c2669>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FairExhibitors_Test_Query$variables = {
  id: string;
};
export type FairExhibitors_Test_Query$data = {
  readonly fair: {
    readonly " $fragmentSpreads": FragmentRefs<"FairExhibitors_fair">;
  } | null | undefined;
};
export type FairExhibitors_Test_Query = {
  response: FairExhibitors_Test_Query$data;
  variables: FairExhibitors_Test_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v7 = {
  "kind": "Literal",
  "name": "height",
  "value": 45
},
v8 = {
  "kind": "Literal",
  "name": "width",
  "value": 45
},
v9 = [
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
v10 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v11 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v12 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Image"
},
v13 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "CroppedImageUrl"
},
v14 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "FairExhibitors_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Fair",
        "kind": "LinkedField",
        "name": "fair",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "FairExhibitors_fair"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "FairExhibitors_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Fair",
        "kind": "LinkedField",
        "name": "fair",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "alias": "metaDescription",
            "args": null,
            "kind": "ScalarField",
            "name": "summary",
            "storageKey": null
          },
          {
            "alias": "metaDescriptionFallback",
            "args": [
              {
                "kind": "Literal",
                "name": "format",
                "value": "PLAIN"
              }
            ],
            "kind": "ScalarField",
            "name": "about",
            "storageKey": "about(format:\"PLAIN\")"
          },
          {
            "alias": "metaImage",
            "args": null,
            "concreteType": "Image",
            "kind": "LinkedField",
            "name": "image",
            "plural": false,
            "selections": [
              {
                "alias": "src",
                "args": [
                  {
                    "kind": "Literal",
                    "name": "version",
                    "value": "large_rectangle"
                  }
                ],
                "kind": "ScalarField",
                "name": "url",
                "storageKey": "url(version:\"large_rectangle\")"
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
                "concreteType": "FairExhibitor",
                "kind": "LinkedField",
                "name": "exhibitors",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "profileID",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Partner",
                    "kind": "LinkedField",
                    "name": "partner",
                    "plural": false,
                    "selections": [
                      (v4/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "type",
                        "storageKey": null
                      },
                      (v5/*: any*/),
                      (v2/*: any*/),
                      (v3/*: any*/),
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
                                  (v6/*: any*/)
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
                          (v3/*: any*/),
                          (v5/*: any*/),
                          (v6/*: any*/)
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
                          (v4/*: any*/),
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
                                  (v7/*: any*/),
                                  (v8/*: any*/)
                                ],
                                "concreteType": "CroppedImageUrl",
                                "kind": "LinkedField",
                                "name": "cropped",
                                "plural": false,
                                "selections": (v9/*: any*/),
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
                                  (v7/*: any*/),
                                  {
                                    "kind": "Literal",
                                    "name": "version",
                                    "value": [
                                      "untouched-png",
                                      "large",
                                      "square"
                                    ]
                                  },
                                  (v8/*: any*/)
                                ],
                                "concreteType": "CroppedImageUrl",
                                "kind": "LinkedField",
                                "name": "cropped",
                                "plural": false,
                                "selections": (v9/*: any*/),
                                "storageKey": "cropped(height:45,version:[\"untouched-png\",\"large\",\"square\"],width:45)"
                              }
                            ],
                            "storageKey": null
                          },
                          (v6/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v6/*: any*/)
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "partnerID",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
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
          (v6/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "9787f27dfe9a963e2dcad08084c889c3",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "fair": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Fair"
        },
        "fair.exhibitorsGroupedByName": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "FairExhibitorsGroup"
        },
        "fair.exhibitorsGroupedByName.exhibitors": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "FairExhibitor"
        },
        "fair.exhibitorsGroupedByName.exhibitors.partner": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Partner"
        },
        "fair.exhibitorsGroupedByName.exhibitors.partner.categories": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "PartnerCategory"
        },
        "fair.exhibitorsGroupedByName.exhibitors.partner.categories.id": (v10/*: any*/),
        "fair.exhibitorsGroupedByName.exhibitors.partner.categories.name": (v11/*: any*/),
        "fair.exhibitorsGroupedByName.exhibitors.partner.categories.slug": (v10/*: any*/),
        "fair.exhibitorsGroupedByName.exhibitors.partner.href": (v11/*: any*/),
        "fair.exhibitorsGroupedByName.exhibitors.partner.id": (v10/*: any*/),
        "fair.exhibitorsGroupedByName.exhibitors.partner.initials": (v11/*: any*/),
        "fair.exhibitorsGroupedByName.exhibitors.partner.internalID": (v10/*: any*/),
        "fair.exhibitorsGroupedByName.exhibitors.partner.locationsConnection": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "LocationConnection"
        },
        "fair.exhibitorsGroupedByName.exhibitors.partner.locationsConnection.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "LocationEdge"
        },
        "fair.exhibitorsGroupedByName.exhibitors.partner.locationsConnection.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Location"
        },
        "fair.exhibitorsGroupedByName.exhibitors.partner.locationsConnection.edges.node.city": (v11/*: any*/),
        "fair.exhibitorsGroupedByName.exhibitors.partner.locationsConnection.edges.node.id": (v10/*: any*/),
        "fair.exhibitorsGroupedByName.exhibitors.partner.name": (v11/*: any*/),
        "fair.exhibitorsGroupedByName.exhibitors.partner.profile": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Profile"
        },
        "fair.exhibitorsGroupedByName.exhibitors.partner.profile.avatar": (v12/*: any*/),
        "fair.exhibitorsGroupedByName.exhibitors.partner.profile.avatar.cropped": (v13/*: any*/),
        "fair.exhibitorsGroupedByName.exhibitors.partner.profile.avatar.cropped.src": (v14/*: any*/),
        "fair.exhibitorsGroupedByName.exhibitors.partner.profile.avatar.cropped.srcSet": (v14/*: any*/),
        "fair.exhibitorsGroupedByName.exhibitors.partner.profile.icon": (v12/*: any*/),
        "fair.exhibitorsGroupedByName.exhibitors.partner.profile.icon.cropped": (v13/*: any*/),
        "fair.exhibitorsGroupedByName.exhibitors.partner.profile.icon.cropped.src": (v14/*: any*/),
        "fair.exhibitorsGroupedByName.exhibitors.partner.profile.icon.cropped.srcSet": (v14/*: any*/),
        "fair.exhibitorsGroupedByName.exhibitors.partner.profile.id": (v10/*: any*/),
        "fair.exhibitorsGroupedByName.exhibitors.partner.profile.internalID": (v10/*: any*/),
        "fair.exhibitorsGroupedByName.exhibitors.partner.slug": (v10/*: any*/),
        "fair.exhibitorsGroupedByName.exhibitors.partner.type": (v11/*: any*/),
        "fair.exhibitorsGroupedByName.exhibitors.partnerID": (v11/*: any*/),
        "fair.exhibitorsGroupedByName.exhibitors.profileID": (v11/*: any*/),
        "fair.exhibitorsGroupedByName.letter": (v11/*: any*/),
        "fair.href": (v11/*: any*/),
        "fair.id": (v10/*: any*/),
        "fair.metaDescription": (v11/*: any*/),
        "fair.metaDescriptionFallback": (v11/*: any*/),
        "fair.metaImage": (v12/*: any*/),
        "fair.metaImage.src": (v11/*: any*/),
        "fair.name": (v11/*: any*/)
      }
    },
    "name": "FairExhibitors_Test_Query",
    "operationKind": "query",
    "text": "query FairExhibitors_Test_Query(\n  $id: String!\n) {\n  fair(id: $id) @principalField {\n    ...FairExhibitors_fair\n    id\n  }\n}\n\nfragment EntityHeaderPartner_partner on Partner {\n  internalID\n  type\n  slug\n  href\n  name\n  initials\n  locationsConnection(first: 15) {\n    edges {\n      node {\n        city\n        id\n      }\n    }\n  }\n  categories {\n    name\n    slug\n    id\n  }\n  profile {\n    internalID\n    avatar: image {\n      cropped(width: 45, height: 45) {\n        src\n        srcSet\n      }\n    }\n    icon {\n      cropped(width: 45, height: 45, version: [\"untouched-png\", \"large\", \"square\"]) {\n        src\n        srcSet\n      }\n    }\n    id\n  }\n}\n\nfragment FairExhibitorCard_exhibitor on FairExhibitor {\n  profileID\n  partner {\n    ...EntityHeaderPartner_partner\n    internalID\n    slug\n    id\n  }\n}\n\nfragment FairExhibitorCard_fair on Fair {\n  href\n}\n\nfragment FairExhibitorsGroup_exhibitorsGroup on FairExhibitorsGroup {\n  exhibitors {\n    ...FairExhibitorCard_exhibitor\n    partner {\n      internalID\n      id\n    }\n  }\n}\n\nfragment FairExhibitorsGroup_fair on Fair {\n  ...FairExhibitorCard_fair\n}\n\nfragment FairExhibitors_fair on Fair {\n  ...FairExhibitorsGroup_fair\n  name\n  href\n  metaDescription: summary\n  metaDescriptionFallback: about(format: PLAIN)\n  metaImage: image {\n    src: url(version: \"large_rectangle\")\n  }\n  exhibitorsGroupedByName {\n    ...FairExhibitorsGroup_exhibitorsGroup\n    letter\n    exhibitors {\n      partnerID\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "6b38f9188e36328f5a3fe8bb93b56862";

export default node;
