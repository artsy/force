/**
 * @generated SignedSource<<b1f79dd98d9c5e6932b5b50ee02fe16e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ShowBannersRailRendererQuery$variables = {
  partnerId: string;
};
export type ShowBannersRailRendererQuery$data = {
  readonly partner: {
    readonly " $fragmentSpreads": FragmentRefs<"ShowBannersRail_partner">;
  } | null | undefined;
};
export type ShowBannersRailRendererQuery = {
  response: ShowBannersRailRendererQuery$data;
  variables: ShowBannersRailRendererQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "partnerId"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "partnerId"
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
  "name": "isDisplayable",
  "value": true
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v5 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "ShowEdge",
    "kind": "LinkedField",
    "name": "edges",
    "plural": true,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Show",
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          (v4/*: any*/),
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
            "kind": "ScalarField",
            "name": "href",
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
            "kind": "ScalarField",
            "name": "status",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "description",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Location",
            "kind": "LinkedField",
            "name": "location",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "city",
                "storageKey": null
              },
              (v4/*: any*/)
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
                "alias": "medium",
                "args": [
                  {
                    "kind": "Literal",
                    "name": "height",
                    "value": 480
                  },
                  {
                    "kind": "Literal",
                    "name": "version",
                    "value": [
                      "main",
                      "normalized",
                      "larger",
                      "large"
                    ]
                  },
                  {
                    "kind": "Literal",
                    "name": "width",
                    "value": 910
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
                "storageKey": "cropped(height:480,version:[\"main\",\"normalized\",\"larger\",\"large\"],width:910)"
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
v6 = {
  "kind": "Literal",
  "name": "first",
  "value": 10
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ShowBannersRailRendererQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Partner",
        "kind": "LinkedField",
        "name": "partner",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ShowBannersRail_partner"
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
    "name": "ShowBannersRailRendererQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Partner",
        "kind": "LinkedField",
        "name": "partner",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": "featuredShow",
            "args": [
              {
                "kind": "Literal",
                "name": "first",
                "value": 1
              },
              (v3/*: any*/),
              {
                "kind": "Literal",
                "name": "sort",
                "value": "FEATURED_DESC_END_AT_DESC"
              },
              {
                "kind": "Literal",
                "name": "status",
                "value": "ALL"
              }
            ],
            "concreteType": "ShowConnection",
            "kind": "LinkedField",
            "name": "showsConnection",
            "plural": false,
            "selections": (v5/*: any*/),
            "storageKey": "showsConnection(first:1,isDisplayable:true,sort:\"FEATURED_DESC_END_AT_DESC\",status:\"ALL\")"
          },
          {
            "alias": "currentShows",
            "args": [
              (v6/*: any*/),
              (v3/*: any*/),
              {
                "kind": "Literal",
                "name": "sort",
                "value": "END_AT_ASC"
              },
              {
                "kind": "Literal",
                "name": "status",
                "value": "CURRENT"
              }
            ],
            "concreteType": "ShowConnection",
            "kind": "LinkedField",
            "name": "showsConnection",
            "plural": false,
            "selections": (v5/*: any*/),
            "storageKey": "showsConnection(first:10,isDisplayable:true,sort:\"END_AT_ASC\",status:\"CURRENT\")"
          },
          {
            "alias": "upcomingShows",
            "args": [
              (v6/*: any*/),
              (v3/*: any*/),
              {
                "kind": "Literal",
                "name": "sort",
                "value": "START_AT_ASC"
              },
              {
                "kind": "Literal",
                "name": "status",
                "value": "UPCOMING"
              }
            ],
            "concreteType": "ShowConnection",
            "kind": "LinkedField",
            "name": "showsConnection",
            "plural": false,
            "selections": (v5/*: any*/),
            "storageKey": "showsConnection(first:10,isDisplayable:true,sort:\"START_AT_ASC\",status:\"UPCOMING\")"
          },
          {
            "alias": "pastShows",
            "args": [
              {
                "kind": "Literal",
                "name": "first",
                "value": 2
              },
              (v3/*: any*/),
              {
                "kind": "Literal",
                "name": "sort",
                "value": "END_AT_DESC"
              },
              {
                "kind": "Literal",
                "name": "status",
                "value": "CLOSED"
              }
            ],
            "concreteType": "ShowConnection",
            "kind": "LinkedField",
            "name": "showsConnection",
            "plural": false,
            "selections": (v5/*: any*/),
            "storageKey": "showsConnection(first:2,isDisplayable:true,sort:\"END_AT_DESC\",status:\"CLOSED\")"
          },
          (v4/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "80195a43cae66720662fae4c8426afb3",
    "id": null,
    "metadata": {},
    "name": "ShowBannersRailRendererQuery",
    "operationKind": "query",
    "text": "query ShowBannersRailRendererQuery(\n  $partnerId: String!\n) {\n  partner(id: $partnerId) @principalField {\n    ...ShowBannersRail_partner\n    id\n  }\n}\n\nfragment ShowBanner_show on Show {\n  slug\n  name\n  href\n  isFairBooth\n  exhibitionPeriod\n  status\n  description\n  location {\n    city\n    id\n  }\n  coverImage {\n    medium: cropped(width: 910, height: 480, version: [\"main\", \"normalized\", \"larger\", \"large\"]) {\n      src\n      srcSet\n    }\n  }\n}\n\nfragment ShowBannersRail_partner on Partner {\n  slug\n  featuredShow: showsConnection(first: 1, status: ALL, sort: FEATURED_DESC_END_AT_DESC, isDisplayable: true) {\n    edges {\n      node {\n        id\n        ...ShowBanner_show\n      }\n    }\n  }\n  currentShows: showsConnection(first: 10, status: CURRENT, sort: END_AT_ASC, isDisplayable: true) {\n    edges {\n      node {\n        id\n        ...ShowBanner_show\n      }\n    }\n  }\n  upcomingShows: showsConnection(first: 10, status: UPCOMING, sort: START_AT_ASC, isDisplayable: true) {\n    edges {\n      node {\n        id\n        ...ShowBanner_show\n      }\n    }\n  }\n  pastShows: showsConnection(first: 2, status: CLOSED, sort: END_AT_DESC, isDisplayable: true) {\n    edges {\n      node {\n        id\n        ...ShowBanner_show\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "ed78181254cd76899a10d28072a86119";

export default node;
