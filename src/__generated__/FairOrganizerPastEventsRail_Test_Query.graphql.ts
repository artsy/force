/**
 * @generated SignedSource<<061cd64a9c29db908f2215b0701b62d3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FairOrganizerPastEventsRail_Test_Query$variables = Record<PropertyKey, never>;
export type FairOrganizerPastEventsRail_Test_Query$data = {
  readonly fairOrganizer: {
    readonly " $fragmentSpreads": FragmentRefs<"FairOrganizerPastEventsRail_fairOrganizer">;
  } | null | undefined;
};
export type FairOrganizerPastEventsRail_Test_Query = {
  response: FairOrganizerPastEventsRail_Test_Query$data;
  variables: FairOrganizerPastEventsRail_Test_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "the-armory-show"
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
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v3 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Int"
},
v4 = {
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
    "name": "FairOrganizerPastEventsRail_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "FairOrganizer",
        "kind": "LinkedField",
        "name": "fairOrganizer",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "FairOrganizerPastEventsRail_fairOrganizer"
          }
        ],
        "storageKey": "fairOrganizer(id:\"the-armory-show\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "FairOrganizerPastEventsRail_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "FairOrganizer",
        "kind": "LinkedField",
        "name": "fairOrganizer",
        "plural": false,
        "selections": [
          {
            "alias": "pastFairs",
            "args": [
              {
                "kind": "Literal",
                "name": "first",
                "value": 20
              },
              {
                "kind": "Literal",
                "name": "hasFullFeature",
                "value": true
              },
              {
                "kind": "Literal",
                "name": "sort",
                "value": "START_AT_DESC"
              },
              {
                "kind": "Literal",
                "name": "status",
                "value": "CLOSED"
              }
            ],
            "concreteType": "FairConnection",
            "kind": "LinkedField",
            "name": "fairsConnection",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "FairEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Fair",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v1/*: any*/),
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
                                "value": 244
                              },
                              {
                                "kind": "Literal",
                                "name": "width",
                                "value": 325
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
                                "name": "width",
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "height",
                                "storageKey": null
                              },
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
                            "storageKey": "cropped(height:244,width:325)"
                          }
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "fairsConnection(first:20,hasFullFeature:true,sort:\"START_AT_DESC\",status:\"CLOSED\")"
          },
          (v1/*: any*/)
        ],
        "storageKey": "fairOrganizer(id:\"the-armory-show\")"
      }
    ]
  },
  "params": {
    "cacheID": "7386bdfb7dc7b35a3ec13a67aae86838",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "fairOrganizer": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "FairOrganizer"
        },
        "fairOrganizer.id": (v2/*: any*/),
        "fairOrganizer.pastFairs": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "FairConnection"
        },
        "fairOrganizer.pastFairs.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "FairEdge"
        },
        "fairOrganizer.pastFairs.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Fair"
        },
        "fairOrganizer.pastFairs.edges.node.id": (v2/*: any*/),
        "fairOrganizer.pastFairs.edges.node.image": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Image"
        },
        "fairOrganizer.pastFairs.edges.node.image.cropped": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CroppedImageUrl"
        },
        "fairOrganizer.pastFairs.edges.node.image.cropped.height": (v3/*: any*/),
        "fairOrganizer.pastFairs.edges.node.image.cropped.src": (v4/*: any*/),
        "fairOrganizer.pastFairs.edges.node.image.cropped.srcSet": (v4/*: any*/),
        "fairOrganizer.pastFairs.edges.node.image.cropped.width": (v3/*: any*/),
        "fairOrganizer.pastFairs.edges.node.name": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "String"
        },
        "fairOrganizer.pastFairs.edges.node.slug": (v2/*: any*/)
      }
    },
    "name": "FairOrganizerPastEventsRail_Test_Query",
    "operationKind": "query",
    "text": "query FairOrganizerPastEventsRail_Test_Query {\n  fairOrganizer(id: \"the-armory-show\") {\n    ...FairOrganizerPastEventsRail_fairOrganizer\n    id\n  }\n}\n\nfragment FairOrganizerPastEventRailCell_fair on Fair {\n  slug\n  name\n  image {\n    cropped(width: 325, height: 244) {\n      width\n      height\n      src\n      srcSet\n    }\n  }\n}\n\nfragment FairOrganizerPastEventsRail_fairOrganizer on FairOrganizer {\n  pastFairs: fairsConnection(first: 20, sort: START_AT_DESC, status: CLOSED, hasFullFeature: true) {\n    edges {\n      node {\n        id\n        ...FairOrganizerPastEventRailCell_fair\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "dddd73919a036a5a81a2c45083847f89";

export default node;
