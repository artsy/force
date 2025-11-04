/**
 * @generated SignedSource<<015ed1a539d4420efafbadb83216282e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FairsIndexTestQuery$variables = Record<PropertyKey, never>;
export type FairsIndexTestQuery$data = {
  readonly featuredFairs: ReadonlyArray<{
    readonly " $fragmentSpreads": FragmentRefs<"FairsIndex_featuredFairs">;
  } | null | undefined> | null | undefined;
  readonly viewer: {
    readonly " $fragmentSpreads": FragmentRefs<"FairsIndex_viewer">;
  } | null | undefined;
};
export type FairsIndexTestQuery = {
  response: FairsIndexTestQuery$data;
  variables: FairsIndexTestQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "key",
    "value": "art-fairs:featured"
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
  "name": "width",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "height",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "src",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "srcSet",
  "storageKey": null
},
v7 = [
  (v3/*: any*/),
  (v4/*: any*/),
  (v5/*: any*/),
  (v6/*: any*/)
],
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v9 = [
  (v8/*: any*/)
],
v10 = {
  "kind": "Literal",
  "name": "hasFullFeature",
  "value": true
},
v11 = {
  "kind": "Literal",
  "name": "hasListing",
  "value": true
},
v12 = {
  "kind": "Literal",
  "name": "size",
  "value": 25
},
v13 = {
  "kind": "Literal",
  "name": "sort",
  "value": "START_AT_DESC"
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isPublished",
  "storageKey": null
},
v15 = {
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
          "name": "height",
          "value": 80
        },
        {
          "kind": "Literal",
          "name": "version",
          "value": "square140"
        },
        {
          "kind": "Literal",
          "name": "width",
          "value": 80
        }
      ],
      "concreteType": "ResizedImageUrl",
      "kind": "LinkedField",
      "name": "resized",
      "plural": false,
      "selections": (v7/*: any*/),
      "storageKey": "resized(height:80,version:\"square140\",width:80)"
    }
  ],
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "concreteType": "Profile",
  "kind": "LinkedField",
  "name": "profile",
  "plural": false,
  "selections": [
    (v14/*: any*/),
    (v8/*: any*/),
    (v15/*: any*/)
  ],
  "storageKey": null
},
v17 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
v18 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v19 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "exhibitionPeriod",
  "storageKey": null
},
v20 = {
  "alias": "isoStartAt",
  "args": null,
  "kind": "ScalarField",
  "name": "startAt",
  "storageKey": null
},
v21 = {
  "alias": null,
  "args": null,
  "concreteType": "FairOrganizer",
  "kind": "LinkedField",
  "name": "organizer",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Profile",
      "kind": "LinkedField",
      "name": "profile",
      "plural": false,
      "selections": [
        (v17/*: any*/),
        (v8/*: any*/)
      ],
      "storageKey": null
    },
    (v8/*: any*/)
  ],
  "storageKey": null
},
v22 = {
  "kind": "Literal",
  "name": "status",
  "value": "CLOSED"
},
v23 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 15
  },
  (v10/*: any*/),
  (v11/*: any*/),
  (v13/*: any*/),
  (v22/*: any*/)
],
v24 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v25 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v26 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Image"
},
v27 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "CroppedImageUrl"
},
v28 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Int"
},
v29 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v30 = {
  "enumValues": null,
  "nullable": true,
  "plural": true,
  "type": "Fair"
},
v31 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Boolean"
},
v32 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "FairOrganizer"
},
v33 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Profile"
},
v34 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "ResizedImageUrl"
},
v35 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Int"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "FairsIndexTestQuery",
    "selections": [
      {
        "alias": "featuredFairs",
        "args": (v0/*: any*/),
        "concreteType": "OrderedSet",
        "kind": "LinkedField",
        "name": "orderedSets",
        "plural": true,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "FairsIndex_featuredFairs"
          }
        ],
        "storageKey": "orderedSets(key:\"art-fairs:featured\")"
      },
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
            "name": "FairsIndex_viewer"
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
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "FairsIndexTestQuery",
    "selections": [
      {
        "alias": "featuredFairs",
        "args": (v0/*: any*/),
        "concreteType": "OrderedSet",
        "kind": "LinkedField",
        "name": "orderedSets",
        "plural": true,
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
                    "kind": "ScalarField",
                    "name": "title",
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
                            "value": 410
                          },
                          {
                            "kind": "Literal",
                            "name": "width",
                            "value": 547
                          }
                        ],
                        "concreteType": "CroppedImageUrl",
                        "kind": "LinkedField",
                        "name": "cropped",
                        "plural": false,
                        "selections": (v7/*: any*/),
                        "storageKey": "cropped(height:410,width:547)"
                      }
                    ],
                    "storageKey": null
                  },
                  (v8/*: any*/)
                ],
                "type": "FeaturedLink",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": (v9/*: any*/),
                "type": "Node",
                "abstractKey": "__isNode"
              },
              {
                "kind": "InlineFragment",
                "selections": (v9/*: any*/),
                "type": "Profile",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": (v9/*: any*/),
                "type": "Video",
                "abstractKey": null
              }
            ],
            "storageKey": null
          },
          (v8/*: any*/)
        ],
        "storageKey": "orderedSets(key:\"art-fairs:featured\")"
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "alias": "runningFairs",
            "args": [
              (v10/*: any*/),
              (v11/*: any*/),
              (v12/*: any*/),
              (v13/*: any*/),
              {
                "kind": "Literal",
                "name": "status",
                "value": "RUNNING"
              }
            ],
            "concreteType": "Fair",
            "kind": "LinkedField",
            "name": "fairs",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "bannerSize",
                "storageKey": null
              },
              (v14/*: any*/),
              (v16/*: any*/),
              (v17/*: any*/),
              (v18/*: any*/),
              (v19/*: any*/),
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
                        "value": 512
                      },
                      {
                        "kind": "Literal",
                        "name": "version",
                        "value": [
                          "wide"
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
                      (v5/*: any*/),
                      (v6/*: any*/),
                      (v3/*: any*/),
                      (v4/*: any*/)
                    ],
                    "storageKey": "cropped(height:512,version:[\"wide\"],width:910)"
                  }
                ],
                "storageKey": null
              },
              (v20/*: any*/),
              (v21/*: any*/),
              (v8/*: any*/)
            ],
            "storageKey": "fairs(hasFullFeature:true,hasListing:true,size:25,sort:\"START_AT_DESC\",status:\"RUNNING\")"
          },
          {
            "alias": "closedFairs",
            "args": [
              (v10/*: any*/),
              (v11/*: any*/),
              (v12/*: any*/),
              (v13/*: any*/),
              (v22/*: any*/)
            ],
            "concreteType": "Fair",
            "kind": "LinkedField",
            "name": "fairs",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              (v14/*: any*/),
              (v16/*: any*/),
              (v17/*: any*/),
              (v18/*: any*/),
              (v20/*: any*/),
              (v19/*: any*/),
              (v21/*: any*/),
              (v8/*: any*/)
            ],
            "storageKey": "fairs(hasFullFeature:true,hasListing:true,size:25,sort:\"START_AT_DESC\",status:\"CLOSED\")"
          },
          {
            "alias": "upcomingFairs",
            "args": [
              (v10/*: any*/),
              (v11/*: any*/),
              (v12/*: any*/),
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
            "concreteType": "Fair",
            "kind": "LinkedField",
            "name": "fairs",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              (v18/*: any*/),
              (v19/*: any*/),
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
                  (v8/*: any*/)
                ],
                "storageKey": null
              },
              (v14/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Profile",
                "kind": "LinkedField",
                "name": "profile",
                "plural": false,
                "selections": [
                  (v14/*: any*/),
                  (v17/*: any*/),
                  (v8/*: any*/),
                  (v15/*: any*/)
                ],
                "storageKey": null
              },
              (v17/*: any*/),
              (v20/*: any*/),
              (v21/*: any*/),
              (v8/*: any*/)
            ],
            "storageKey": "fairs(hasFullFeature:true,hasListing:true,size:25,sort:\"START_AT_ASC\",status:\"UPCOMING\")"
          },
          {
            "alias": "pastFairs",
            "args": (v23/*: any*/),
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
                      (v2/*: any*/),
                      (v14/*: any*/),
                      (v16/*: any*/),
                      (v17/*: any*/),
                      (v18/*: any*/),
                      (v20/*: any*/),
                      (v19/*: any*/),
                      (v21/*: any*/),
                      (v8/*: any*/),
                      (v1/*: any*/)
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "cursor",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
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
                    "name": "endCursor",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "hasNextPage",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "fairsConnection(first:15,hasFullFeature:true,hasListing:true,sort:\"START_AT_DESC\",status:\"CLOSED\")"
          },
          {
            "alias": "pastFairs",
            "args": (v23/*: any*/),
            "filters": [
              "hasListing",
              "hasFullFeature",
              "sort",
              "status"
            ],
            "handle": "connection",
            "key": "FairsPastFairsQuery_pastFairs",
            "kind": "LinkedHandle",
            "name": "fairsConnection"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "4e21534bef1062b2112214328c29e04f",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "featuredFairs": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "OrderedSet"
        },
        "featuredFairs.id": (v24/*: any*/),
        "featuredFairs.items": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "OrderedSetItem"
        },
        "featuredFairs.items.__isNode": (v25/*: any*/),
        "featuredFairs.items.__typename": (v25/*: any*/),
        "featuredFairs.items.id": (v24/*: any*/),
        "featuredFairs.items.image": (v26/*: any*/),
        "featuredFairs.items.image.cropped": (v27/*: any*/),
        "featuredFairs.items.image.cropped.height": (v28/*: any*/),
        "featuredFairs.items.image.cropped.src": (v25/*: any*/),
        "featuredFairs.items.image.cropped.srcSet": (v25/*: any*/),
        "featuredFairs.items.image.cropped.width": (v28/*: any*/),
        "featuredFairs.items.internalID": (v24/*: any*/),
        "featuredFairs.items.title": (v29/*: any*/),
        "viewer": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Viewer"
        },
        "viewer.closedFairs": (v30/*: any*/),
        "viewer.closedFairs.exhibitionPeriod": (v29/*: any*/),
        "viewer.closedFairs.href": (v29/*: any*/),
        "viewer.closedFairs.id": (v24/*: any*/),
        "viewer.closedFairs.internalID": (v24/*: any*/),
        "viewer.closedFairs.isPublished": (v31/*: any*/),
        "viewer.closedFairs.isoStartAt": (v29/*: any*/),
        "viewer.closedFairs.name": (v29/*: any*/),
        "viewer.closedFairs.organizer": (v32/*: any*/),
        "viewer.closedFairs.organizer.id": (v24/*: any*/),
        "viewer.closedFairs.organizer.profile": (v33/*: any*/),
        "viewer.closedFairs.organizer.profile.href": (v29/*: any*/),
        "viewer.closedFairs.organizer.profile.id": (v24/*: any*/),
        "viewer.closedFairs.profile": (v33/*: any*/),
        "viewer.closedFairs.profile.icon": (v26/*: any*/),
        "viewer.closedFairs.profile.icon.resized": (v34/*: any*/),
        "viewer.closedFairs.profile.icon.resized.height": (v35/*: any*/),
        "viewer.closedFairs.profile.icon.resized.src": (v25/*: any*/),
        "viewer.closedFairs.profile.icon.resized.srcSet": (v25/*: any*/),
        "viewer.closedFairs.profile.icon.resized.width": (v35/*: any*/),
        "viewer.closedFairs.profile.id": (v24/*: any*/),
        "viewer.closedFairs.profile.isPublished": (v31/*: any*/),
        "viewer.pastFairs": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "FairConnection"
        },
        "viewer.pastFairs.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "FairEdge"
        },
        "viewer.pastFairs.edges.cursor": (v25/*: any*/),
        "viewer.pastFairs.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Fair"
        },
        "viewer.pastFairs.edges.node.__typename": (v25/*: any*/),
        "viewer.pastFairs.edges.node.exhibitionPeriod": (v29/*: any*/),
        "viewer.pastFairs.edges.node.href": (v29/*: any*/),
        "viewer.pastFairs.edges.node.id": (v24/*: any*/),
        "viewer.pastFairs.edges.node.internalID": (v24/*: any*/),
        "viewer.pastFairs.edges.node.isPublished": (v31/*: any*/),
        "viewer.pastFairs.edges.node.isoStartAt": (v29/*: any*/),
        "viewer.pastFairs.edges.node.name": (v29/*: any*/),
        "viewer.pastFairs.edges.node.organizer": (v32/*: any*/),
        "viewer.pastFairs.edges.node.organizer.id": (v24/*: any*/),
        "viewer.pastFairs.edges.node.organizer.profile": (v33/*: any*/),
        "viewer.pastFairs.edges.node.organizer.profile.href": (v29/*: any*/),
        "viewer.pastFairs.edges.node.organizer.profile.id": (v24/*: any*/),
        "viewer.pastFairs.edges.node.profile": (v33/*: any*/),
        "viewer.pastFairs.edges.node.profile.icon": (v26/*: any*/),
        "viewer.pastFairs.edges.node.profile.icon.resized": (v34/*: any*/),
        "viewer.pastFairs.edges.node.profile.icon.resized.height": (v35/*: any*/),
        "viewer.pastFairs.edges.node.profile.icon.resized.src": (v25/*: any*/),
        "viewer.pastFairs.edges.node.profile.icon.resized.srcSet": (v25/*: any*/),
        "viewer.pastFairs.edges.node.profile.icon.resized.width": (v35/*: any*/),
        "viewer.pastFairs.edges.node.profile.id": (v24/*: any*/),
        "viewer.pastFairs.edges.node.profile.isPublished": (v31/*: any*/),
        "viewer.pastFairs.pageInfo": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "PageInfo"
        },
        "viewer.pastFairs.pageInfo.endCursor": (v29/*: any*/),
        "viewer.pastFairs.pageInfo.hasNextPage": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "Boolean"
        },
        "viewer.runningFairs": (v30/*: any*/),
        "viewer.runningFairs.bannerSize": (v29/*: any*/),
        "viewer.runningFairs.exhibitionPeriod": (v29/*: any*/),
        "viewer.runningFairs.href": (v29/*: any*/),
        "viewer.runningFairs.id": (v24/*: any*/),
        "viewer.runningFairs.image": (v26/*: any*/),
        "viewer.runningFairs.image.cropped": (v27/*: any*/),
        "viewer.runningFairs.image.cropped.height": (v28/*: any*/),
        "viewer.runningFairs.image.cropped.src": (v25/*: any*/),
        "viewer.runningFairs.image.cropped.srcSet": (v25/*: any*/),
        "viewer.runningFairs.image.cropped.width": (v28/*: any*/),
        "viewer.runningFairs.internalID": (v24/*: any*/),
        "viewer.runningFairs.isPublished": (v31/*: any*/),
        "viewer.runningFairs.isoStartAt": (v29/*: any*/),
        "viewer.runningFairs.name": (v29/*: any*/),
        "viewer.runningFairs.organizer": (v32/*: any*/),
        "viewer.runningFairs.organizer.id": (v24/*: any*/),
        "viewer.runningFairs.organizer.profile": (v33/*: any*/),
        "viewer.runningFairs.organizer.profile.href": (v29/*: any*/),
        "viewer.runningFairs.organizer.profile.id": (v24/*: any*/),
        "viewer.runningFairs.profile": (v33/*: any*/),
        "viewer.runningFairs.profile.icon": (v26/*: any*/),
        "viewer.runningFairs.profile.icon.resized": (v34/*: any*/),
        "viewer.runningFairs.profile.icon.resized.height": (v35/*: any*/),
        "viewer.runningFairs.profile.icon.resized.src": (v25/*: any*/),
        "viewer.runningFairs.profile.icon.resized.srcSet": (v25/*: any*/),
        "viewer.runningFairs.profile.icon.resized.width": (v35/*: any*/),
        "viewer.runningFairs.profile.id": (v24/*: any*/),
        "viewer.runningFairs.profile.isPublished": (v31/*: any*/),
        "viewer.upcomingFairs": (v30/*: any*/),
        "viewer.upcomingFairs.exhibitionPeriod": (v29/*: any*/),
        "viewer.upcomingFairs.href": (v29/*: any*/),
        "viewer.upcomingFairs.id": (v24/*: any*/),
        "viewer.upcomingFairs.internalID": (v24/*: any*/),
        "viewer.upcomingFairs.isPublished": (v31/*: any*/),
        "viewer.upcomingFairs.isoStartAt": (v29/*: any*/),
        "viewer.upcomingFairs.location": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Location"
        },
        "viewer.upcomingFairs.location.city": (v29/*: any*/),
        "viewer.upcomingFairs.location.id": (v24/*: any*/),
        "viewer.upcomingFairs.name": (v29/*: any*/),
        "viewer.upcomingFairs.organizer": (v32/*: any*/),
        "viewer.upcomingFairs.organizer.id": (v24/*: any*/),
        "viewer.upcomingFairs.organizer.profile": (v33/*: any*/),
        "viewer.upcomingFairs.organizer.profile.href": (v29/*: any*/),
        "viewer.upcomingFairs.organizer.profile.id": (v24/*: any*/),
        "viewer.upcomingFairs.profile": (v33/*: any*/),
        "viewer.upcomingFairs.profile.href": (v29/*: any*/),
        "viewer.upcomingFairs.profile.icon": (v26/*: any*/),
        "viewer.upcomingFairs.profile.icon.resized": (v34/*: any*/),
        "viewer.upcomingFairs.profile.icon.resized.height": (v35/*: any*/),
        "viewer.upcomingFairs.profile.icon.resized.src": (v25/*: any*/),
        "viewer.upcomingFairs.profile.icon.resized.srcSet": (v25/*: any*/),
        "viewer.upcomingFairs.profile.icon.resized.width": (v35/*: any*/),
        "viewer.upcomingFairs.profile.id": (v24/*: any*/),
        "viewer.upcomingFairs.profile.isPublished": (v31/*: any*/)
      }
    },
    "name": "FairsIndexTestQuery",
    "operationKind": "query",
    "text": "query FairsIndexTestQuery {\n  featuredFairs: orderedSets(key: \"art-fairs:featured\") {\n    ...FairsIndex_featuredFairs\n    id\n  }\n  viewer {\n    ...FairsIndex_viewer\n  }\n}\n\nfragment FairsFairBanner_fair on Fair {\n  href\n  name\n  exhibitionPeriod\n  image {\n    cropped(width: 910, height: 512, version: [\"wide\"]) {\n      src\n      srcSet\n      width\n      height\n    }\n  }\n  profile {\n    icon {\n      resized(width: 80, height: 80, version: \"square140\") {\n        width\n        height\n        src\n        srcSet\n      }\n    }\n    id\n  }\n}\n\nfragment FairsFairRow_fair on Fair {\n  href\n  name\n  isoStartAt: startAt\n  exhibitionPeriod\n  profile {\n    icon {\n      resized(width: 80, height: 80, version: \"square140\") {\n        width\n        height\n        src\n        srcSet\n      }\n    }\n    id\n  }\n  organizer {\n    profile {\n      href\n      id\n    }\n    id\n  }\n}\n\nfragment FairsIndex_featuredFairs on OrderedSet {\n  items {\n    __typename\n    ... on FeaturedLink {\n      internalID\n      title\n      image {\n        cropped(width: 547, height: 410) {\n          width\n          height\n          src\n          srcSet\n        }\n      }\n      id\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n    ... on Profile {\n      id\n    }\n    ... on Video {\n      id\n    }\n  }\n}\n\nfragment FairsIndex_viewer on Viewer {\n  runningFairs: fairs(hasListing: true, hasFullFeature: true, sort: START_AT_DESC, size: 25, status: RUNNING) {\n    internalID\n    bannerSize\n    isPublished\n    profile {\n      isPublished\n      id\n    }\n    ...FairsFairBanner_fair\n    ...FairsFairRow_fair\n    id\n  }\n  closedFairs: fairs(hasListing: true, hasFullFeature: true, sort: START_AT_DESC, size: 25, status: CLOSED) {\n    internalID\n    isPublished\n    profile {\n      isPublished\n      id\n    }\n    ...FairsFairRow_fair\n    id\n  }\n  upcomingFairs: fairs(hasListing: true, hasFullFeature: true, sort: START_AT_ASC, size: 25, status: UPCOMING) {\n    internalID\n    name\n    exhibitionPeriod\n    location {\n      city\n      id\n    }\n    isPublished\n    profile {\n      isPublished\n      href\n      id\n    }\n    ...FairsFairRow_fair\n    id\n  }\n  ...FairsPastFairs_viewer\n}\n\nfragment FairsPastFairs_viewer on Viewer {\n  pastFairs: fairsConnection(hasListing: true, hasFullFeature: true, sort: START_AT_DESC, status: CLOSED, first: 15) {\n    edges {\n      node {\n        internalID\n        isPublished\n        profile {\n          isPublished\n          id\n        }\n        ...FairsFairRow_fair\n        id\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "e897f5bec454c4f4cc2be4923e37d6e6";

export default node;
