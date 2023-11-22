/**
 * @generated SignedSource<<e006689105945550156898ac39ee8d4d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ShowsCity_Test_Query$variables = Record<PropertyKey, never>;
export type ShowsCity_Test_Query$data = {
  readonly city: {
    readonly " $fragmentSpreads": FragmentRefs<"ShowsCity_city">;
  } | null | undefined;
  readonly viewer: {
    readonly " $fragmentSpreads": FragmentRefs<"ShowsCity_viewer">;
  } | null | undefined;
};
export type ShowsCity_Test_Query = {
  response: ShowsCity_Test_Query$data;
  variables: ShowsCity_Test_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "slug",
    "value": "example"
  }
],
v1 = [
  {
    "alias": "text",
    "args": null,
    "kind": "ScalarField",
    "name": "name",
    "storageKey": null
  },
  {
    "alias": "value",
    "args": null,
    "kind": "ScalarField",
    "name": "slug",
    "storageKey": null
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v3 = {
  "kind": "Literal",
  "name": "first",
  "value": 18
},
v4 = [
  {
    "kind": "Literal",
    "name": "format",
    "value": "MMM D"
  }
],
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v6 = {
  "kind": "Literal",
  "name": "version",
  "value": [
    "main",
    "normalized",
    "larger",
    "large"
  ]
},
v7 = [
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
v8 = {
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
          "alias": "formattedStartAt",
          "args": (v4/*: any*/),
          "kind": "ScalarField",
          "name": "startAt",
          "storageKey": "startAt(format:\"MMM D\")"
        },
        {
          "alias": "formattedEndAt",
          "args": (v4/*: any*/),
          "kind": "ScalarField",
          "name": "endAt",
          "storageKey": "endAt(format:\"MMM D\")"
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
            (v5/*: any*/)
          ],
          "storageKey": null
        },
        (v5/*: any*/),
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
          "concreteType": "Image",
          "kind": "LinkedField",
          "name": "coverImage",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "title",
              "storageKey": null
            },
            {
              "alias": "large",
              "args": [
                {
                  "kind": "Literal",
                  "name": "height",
                  "value": 683
                },
                (v6/*: any*/),
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
              "selections": (v7/*: any*/),
              "storageKey": "cropped(height:683,version:[\"main\",\"normalized\",\"larger\",\"large\"],width:910)"
            },
            {
              "alias": "small",
              "args": [
                {
                  "kind": "Literal",
                  "name": "height",
                  "value": 450
                },
                (v6/*: any*/),
                {
                  "kind": "Literal",
                  "name": "width",
                  "value": 600
                }
              ],
              "concreteType": "CroppedImageUrl",
              "kind": "LinkedField",
              "name": "cropped",
              "plural": false,
              "selections": (v7/*: any*/),
              "storageKey": "cropped(height:450,version:[\"main\",\"normalized\",\"larger\",\"large\"],width:600)"
            }
          ],
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
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "__typename",
              "storageKey": null
            },
            {
              "kind": "InlineFragment",
              "selections": [
                (v2/*: any*/)
              ],
              "type": "Partner",
              "abstractKey": null
            },
            {
              "kind": "InlineFragment",
              "selections": [
                (v2/*: any*/),
                (v5/*: any*/)
              ],
              "type": "ExternalPartner",
              "abstractKey": null
            },
            {
              "kind": "InlineFragment",
              "selections": [
                (v5/*: any*/)
              ],
              "type": "Node",
              "abstractKey": "__isNode"
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "storageKey": null
},
v9 = [
  (v8/*: any*/)
],
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "page",
  "storageKey": null
},
v12 = [
  (v10/*: any*/),
  (v11/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "isCurrent",
    "storageKey": null
  }
],
v13 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "ShowConnection"
},
v14 = {
  "enumValues": null,
  "nullable": true,
  "plural": true,
  "type": "ShowEdge"
},
v15 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Show"
},
v16 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Image"
},
v17 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "CroppedImageUrl"
},
v18 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Int"
},
v19 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v20 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v21 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v22 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Location"
},
v23 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "PartnerTypes"
},
v24 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Boolean"
},
v25 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "PageCursor"
},
v26 = {
  "enumValues": null,
  "nullable": false,
  "plural": true,
  "type": "City"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ShowsCity_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ShowsCity_viewer"
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "City",
        "kind": "LinkedField",
        "name": "city",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ShowsCity_city"
          }
        ],
        "storageKey": "city(slug:\"example\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ShowsCity_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "alias": "allCities",
            "args": null,
            "concreteType": "City",
            "kind": "LinkedField",
            "name": "cities",
            "plural": true,
            "selections": (v1/*: any*/),
            "storageKey": null
          },
          {
            "alias": "featuredCities",
            "args": [
              {
                "kind": "Literal",
                "name": "featured",
                "value": true
              }
            ],
            "concreteType": "City",
            "kind": "LinkedField",
            "name": "cities",
            "plural": true,
            "selections": (v1/*: any*/),
            "storageKey": "cities(featured:true)"
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "City",
        "kind": "LinkedField",
        "name": "city",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "slug",
            "storageKey": null
          },
          {
            "alias": "upcomingShows",
            "args": [
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
            "selections": (v9/*: any*/),
            "storageKey": "showsConnection(first:18,sort:\"START_AT_ASC\",status:\"UPCOMING\")"
          },
          {
            "alias": "currentShows",
            "args": [
              (v3/*: any*/),
              {
                "kind": "Literal",
                "name": "sort",
                "value": "END_AT_ASC"
              },
              {
                "kind": "Literal",
                "name": "status",
                "value": "RUNNING"
              }
            ],
            "concreteType": "ShowConnection",
            "kind": "LinkedField",
            "name": "showsConnection",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "PageInfo",
                "kind": "LinkedField",
                "name": "pageInfo",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "hasNextPage",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "endCursor",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "PageCursors",
                "kind": "LinkedField",
                "name": "pageCursors",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "PageCursor",
                    "kind": "LinkedField",
                    "name": "around",
                    "plural": true,
                    "selections": (v12/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "PageCursor",
                    "kind": "LinkedField",
                    "name": "first",
                    "plural": false,
                    "selections": (v12/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "PageCursor",
                    "kind": "LinkedField",
                    "name": "last",
                    "plural": false,
                    "selections": (v12/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "PageCursor",
                    "kind": "LinkedField",
                    "name": "previous",
                    "plural": false,
                    "selections": [
                      (v10/*: any*/),
                      (v11/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "totalCount",
                "storageKey": null
              },
              (v8/*: any*/)
            ],
            "storageKey": "showsConnection(first:18,sort:\"END_AT_ASC\",status:\"RUNNING\")"
          },
          {
            "alias": "pastShows",
            "args": [
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
            "selections": (v9/*: any*/),
            "storageKey": "showsConnection(first:18,sort:\"END_AT_DESC\",status:\"CLOSED\")"
          }
        ],
        "storageKey": "city(slug:\"example\")"
      }
    ]
  },
  "params": {
    "cacheID": "f14f5d2944a17fd68206096c33fae266",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "city": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "City"
        },
        "city.currentShows": (v13/*: any*/),
        "city.currentShows.edges": (v14/*: any*/),
        "city.currentShows.edges.node": (v15/*: any*/),
        "city.currentShows.edges.node.coverImage": (v16/*: any*/),
        "city.currentShows.edges.node.coverImage.large": (v17/*: any*/),
        "city.currentShows.edges.node.coverImage.large.height": (v18/*: any*/),
        "city.currentShows.edges.node.coverImage.large.src": (v19/*: any*/),
        "city.currentShows.edges.node.coverImage.large.srcSet": (v19/*: any*/),
        "city.currentShows.edges.node.coverImage.large.width": (v18/*: any*/),
        "city.currentShows.edges.node.coverImage.small": (v17/*: any*/),
        "city.currentShows.edges.node.coverImage.small.height": (v18/*: any*/),
        "city.currentShows.edges.node.coverImage.small.src": (v19/*: any*/),
        "city.currentShows.edges.node.coverImage.small.srcSet": (v19/*: any*/),
        "city.currentShows.edges.node.coverImage.small.width": (v18/*: any*/),
        "city.currentShows.edges.node.coverImage.title": (v20/*: any*/),
        "city.currentShows.edges.node.endAt": (v20/*: any*/),
        "city.currentShows.edges.node.formattedEndAt": (v20/*: any*/),
        "city.currentShows.edges.node.formattedStartAt": (v20/*: any*/),
        "city.currentShows.edges.node.href": (v20/*: any*/),
        "city.currentShows.edges.node.id": (v21/*: any*/),
        "city.currentShows.edges.node.internalID": (v21/*: any*/),
        "city.currentShows.edges.node.location": (v22/*: any*/),
        "city.currentShows.edges.node.location.city": (v20/*: any*/),
        "city.currentShows.edges.node.location.id": (v21/*: any*/),
        "city.currentShows.edges.node.name": (v20/*: any*/),
        "city.currentShows.edges.node.partner": (v23/*: any*/),
        "city.currentShows.edges.node.partner.__isNode": (v19/*: any*/),
        "city.currentShows.edges.node.partner.__typename": (v19/*: any*/),
        "city.currentShows.edges.node.partner.id": (v21/*: any*/),
        "city.currentShows.edges.node.partner.name": (v20/*: any*/),
        "city.currentShows.edges.node.startAt": (v20/*: any*/),
        "city.currentShows.pageCursors": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "PageCursors"
        },
        "city.currentShows.pageCursors.around": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "PageCursor"
        },
        "city.currentShows.pageCursors.around.cursor": (v19/*: any*/),
        "city.currentShows.pageCursors.around.isCurrent": (v24/*: any*/),
        "city.currentShows.pageCursors.around.page": (v18/*: any*/),
        "city.currentShows.pageCursors.first": (v25/*: any*/),
        "city.currentShows.pageCursors.first.cursor": (v19/*: any*/),
        "city.currentShows.pageCursors.first.isCurrent": (v24/*: any*/),
        "city.currentShows.pageCursors.first.page": (v18/*: any*/),
        "city.currentShows.pageCursors.last": (v25/*: any*/),
        "city.currentShows.pageCursors.last.cursor": (v19/*: any*/),
        "city.currentShows.pageCursors.last.isCurrent": (v24/*: any*/),
        "city.currentShows.pageCursors.last.page": (v18/*: any*/),
        "city.currentShows.pageCursors.previous": (v25/*: any*/),
        "city.currentShows.pageCursors.previous.cursor": (v19/*: any*/),
        "city.currentShows.pageCursors.previous.page": (v18/*: any*/),
        "city.currentShows.pageInfo": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "PageInfo"
        },
        "city.currentShows.pageInfo.endCursor": (v20/*: any*/),
        "city.currentShows.pageInfo.hasNextPage": (v24/*: any*/),
        "city.currentShows.totalCount": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Int"
        },
        "city.name": (v19/*: any*/),
        "city.pastShows": (v13/*: any*/),
        "city.pastShows.edges": (v14/*: any*/),
        "city.pastShows.edges.node": (v15/*: any*/),
        "city.pastShows.edges.node.coverImage": (v16/*: any*/),
        "city.pastShows.edges.node.coverImage.large": (v17/*: any*/),
        "city.pastShows.edges.node.coverImage.large.height": (v18/*: any*/),
        "city.pastShows.edges.node.coverImage.large.src": (v19/*: any*/),
        "city.pastShows.edges.node.coverImage.large.srcSet": (v19/*: any*/),
        "city.pastShows.edges.node.coverImage.large.width": (v18/*: any*/),
        "city.pastShows.edges.node.coverImage.small": (v17/*: any*/),
        "city.pastShows.edges.node.coverImage.small.height": (v18/*: any*/),
        "city.pastShows.edges.node.coverImage.small.src": (v19/*: any*/),
        "city.pastShows.edges.node.coverImage.small.srcSet": (v19/*: any*/),
        "city.pastShows.edges.node.coverImage.small.width": (v18/*: any*/),
        "city.pastShows.edges.node.coverImage.title": (v20/*: any*/),
        "city.pastShows.edges.node.endAt": (v20/*: any*/),
        "city.pastShows.edges.node.formattedEndAt": (v20/*: any*/),
        "city.pastShows.edges.node.formattedStartAt": (v20/*: any*/),
        "city.pastShows.edges.node.href": (v20/*: any*/),
        "city.pastShows.edges.node.id": (v21/*: any*/),
        "city.pastShows.edges.node.internalID": (v21/*: any*/),
        "city.pastShows.edges.node.location": (v22/*: any*/),
        "city.pastShows.edges.node.location.city": (v20/*: any*/),
        "city.pastShows.edges.node.location.id": (v21/*: any*/),
        "city.pastShows.edges.node.name": (v20/*: any*/),
        "city.pastShows.edges.node.partner": (v23/*: any*/),
        "city.pastShows.edges.node.partner.__isNode": (v19/*: any*/),
        "city.pastShows.edges.node.partner.__typename": (v19/*: any*/),
        "city.pastShows.edges.node.partner.id": (v21/*: any*/),
        "city.pastShows.edges.node.partner.name": (v20/*: any*/),
        "city.pastShows.edges.node.startAt": (v20/*: any*/),
        "city.slug": (v19/*: any*/),
        "city.upcomingShows": (v13/*: any*/),
        "city.upcomingShows.edges": (v14/*: any*/),
        "city.upcomingShows.edges.node": (v15/*: any*/),
        "city.upcomingShows.edges.node.coverImage": (v16/*: any*/),
        "city.upcomingShows.edges.node.coverImage.large": (v17/*: any*/),
        "city.upcomingShows.edges.node.coverImage.large.height": (v18/*: any*/),
        "city.upcomingShows.edges.node.coverImage.large.src": (v19/*: any*/),
        "city.upcomingShows.edges.node.coverImage.large.srcSet": (v19/*: any*/),
        "city.upcomingShows.edges.node.coverImage.large.width": (v18/*: any*/),
        "city.upcomingShows.edges.node.coverImage.small": (v17/*: any*/),
        "city.upcomingShows.edges.node.coverImage.small.height": (v18/*: any*/),
        "city.upcomingShows.edges.node.coverImage.small.src": (v19/*: any*/),
        "city.upcomingShows.edges.node.coverImage.small.srcSet": (v19/*: any*/),
        "city.upcomingShows.edges.node.coverImage.small.width": (v18/*: any*/),
        "city.upcomingShows.edges.node.coverImage.title": (v20/*: any*/),
        "city.upcomingShows.edges.node.endAt": (v20/*: any*/),
        "city.upcomingShows.edges.node.formattedEndAt": (v20/*: any*/),
        "city.upcomingShows.edges.node.formattedStartAt": (v20/*: any*/),
        "city.upcomingShows.edges.node.href": (v20/*: any*/),
        "city.upcomingShows.edges.node.id": (v21/*: any*/),
        "city.upcomingShows.edges.node.internalID": (v21/*: any*/),
        "city.upcomingShows.edges.node.location": (v22/*: any*/),
        "city.upcomingShows.edges.node.location.city": (v20/*: any*/),
        "city.upcomingShows.edges.node.location.id": (v21/*: any*/),
        "city.upcomingShows.edges.node.name": (v20/*: any*/),
        "city.upcomingShows.edges.node.partner": (v23/*: any*/),
        "city.upcomingShows.edges.node.partner.__isNode": (v19/*: any*/),
        "city.upcomingShows.edges.node.partner.__typename": (v19/*: any*/),
        "city.upcomingShows.edges.node.partner.id": (v21/*: any*/),
        "city.upcomingShows.edges.node.partner.name": (v20/*: any*/),
        "city.upcomingShows.edges.node.startAt": (v20/*: any*/),
        "viewer": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Viewer"
        },
        "viewer.allCities": (v26/*: any*/),
        "viewer.allCities.text": (v19/*: any*/),
        "viewer.allCities.value": (v19/*: any*/),
        "viewer.featuredCities": (v26/*: any*/),
        "viewer.featuredCities.text": (v19/*: any*/),
        "viewer.featuredCities.value": (v19/*: any*/)
      }
    },
    "name": "ShowsCity_Test_Query",
    "operationKind": "query",
    "text": "query ShowsCity_Test_Query {\n  viewer {\n    ...ShowsCity_viewer\n  }\n  city(slug: \"example\") {\n    ...ShowsCity_city\n  }\n}\n\nfragment Pagination_pageCursors on PageCursors {\n  around {\n    cursor\n    page\n    isCurrent\n  }\n  first {\n    cursor\n    page\n    isCurrent\n  }\n  last {\n    cursor\n    page\n    isCurrent\n  }\n  previous {\n    cursor\n    page\n  }\n}\n\nfragment ShowsCity_city on City {\n  name\n  slug\n  upcomingShows: showsConnection(first: 18, status: UPCOMING, sort: START_AT_ASC) {\n    edges {\n      node {\n        internalID\n        startAt\n        ...ShowsFeaturedShow_show\n        id\n      }\n    }\n  }\n  currentShows: showsConnection(first: 18, status: RUNNING, sort: END_AT_ASC) {\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n    pageCursors {\n      ...Pagination_pageCursors\n    }\n    totalCount\n    edges {\n      node {\n        internalID\n        ...ShowsFeaturedShow_show\n        id\n      }\n    }\n  }\n  pastShows: showsConnection(first: 18, status: CLOSED, sort: END_AT_DESC) {\n    edges {\n      node {\n        internalID\n        ...ShowsFeaturedShow_show\n        id\n      }\n    }\n  }\n}\n\nfragment ShowsCity_viewer on Viewer {\n  ...ShowsHeader_viewer\n}\n\nfragment ShowsFeaturedShow_show on Show {\n  ...ShowsShowDates_show\n  id\n  name\n  href\n  coverImage {\n    title\n    large: cropped(width: 910, height: 683, version: [\"main\", \"normalized\", \"larger\", \"large\"]) {\n      width\n      height\n      src\n      srcSet\n    }\n    small: cropped(width: 600, height: 450, version: [\"main\", \"normalized\", \"larger\", \"large\"]) {\n      width\n      height\n      src\n      srcSet\n    }\n  }\n  partner {\n    __typename\n    ... on Partner {\n      name\n    }\n    ... on ExternalPartner {\n      name\n      id\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n  }\n}\n\nfragment ShowsHeader_viewer on Viewer {\n  allCities: cities {\n    text: name\n    value: slug\n  }\n  featuredCities: cities(featured: true) {\n    text: name\n    value: slug\n  }\n}\n\nfragment ShowsShowDates_show on Show {\n  startAt\n  endAt\n  formattedStartAt: startAt(format: \"MMM D\")\n  formattedEndAt: endAt(format: \"MMM D\")\n  location {\n    city\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "1c1a75e5bd3a9b9f2c59c2432602eb96";

export default node;
