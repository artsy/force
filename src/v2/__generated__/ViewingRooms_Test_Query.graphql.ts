/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ViewingRooms_Test_QueryVariables = {};
export type ViewingRooms_Test_QueryResponse = {
    readonly partner: {
        readonly " $fragmentRefs": FragmentRefs<"ViewingRooms_partner">;
    } | null;
};
export type ViewingRooms_Test_Query = {
    readonly response: ViewingRooms_Test_QueryResponse;
    readonly variables: ViewingRooms_Test_QueryVariables;
};



/*
query ViewingRooms_Test_Query {
  partner(id: "white-cube") @principalField {
    ...ViewingRooms_partner
    id
  }
}

fragment ViewingRoomCard_viewingRoom on ViewingRoom {
  href
  title
  exhibitionPeriod
  coverImage: image {
    imageURLs {
      normalized
    }
    width
    height
  }
}

fragment ViewingRooms_edges on ViewingRoomsEdge {
  node {
    internalID
    ...ViewingRoomCard_viewingRoom
  }
}

fragment ViewingRooms_partner on Partner {
  slug
  currentViewingRooms: viewingRoomsConnection(first: 12, statuses: live) {
    edges {
      node {
        internalID
      }
      ...ViewingRooms_edges
    }
  }
  upcomingViewingRooms: viewingRoomsConnection(first: 12, statuses: scheduled) {
    edges {
      node {
        internalID
      }
      ...ViewingRooms_edges
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "white-cube"
  }
],
v1 = {
  "kind": "Literal",
  "name": "first",
  "value": 12
},
v2 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "ViewingRoomsEdge",
    "kind": "LinkedField",
    "name": "edges",
    "plural": true,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "ViewingRoom",
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
            "name": "href",
            "storageKey": null
          },
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
            "kind": "ScalarField",
            "name": "exhibitionPeriod",
            "storageKey": null
          },
          {
            "alias": "coverImage",
            "args": null,
            "concreteType": "ARImage",
            "kind": "LinkedField",
            "name": "image",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "ImageURLs",
                "kind": "LinkedField",
                "name": "imageURLs",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "normalized",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
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
v3 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "ViewingRoomsConnection"
},
v4 = {
  "enumValues": null,
  "nullable": true,
  "plural": true,
  "type": "ViewingRoomsEdge"
},
v5 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "ViewingRoom"
},
v6 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "ARImage"
},
v7 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Int"
},
v8 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "ImageURLs"
},
v9 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v10 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v11 = {
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
    "name": "ViewingRooms_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Partner",
        "kind": "LinkedField",
        "name": "partner",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ViewingRooms_partner"
          }
        ],
        "storageKey": "partner(id:\"white-cube\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ViewingRooms_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Partner",
        "kind": "LinkedField",
        "name": "partner",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "slug",
            "storageKey": null
          },
          {
            "alias": "currentViewingRooms",
            "args": [
              (v1/*: any*/),
              {
                "kind": "Literal",
                "name": "statuses",
                "value": "live"
              }
            ],
            "concreteType": "ViewingRoomsConnection",
            "kind": "LinkedField",
            "name": "viewingRoomsConnection",
            "plural": false,
            "selections": (v2/*: any*/),
            "storageKey": "viewingRoomsConnection(first:12,statuses:\"live\")"
          },
          {
            "alias": "upcomingViewingRooms",
            "args": [
              (v1/*: any*/),
              {
                "kind": "Literal",
                "name": "statuses",
                "value": "scheduled"
              }
            ],
            "concreteType": "ViewingRoomsConnection",
            "kind": "LinkedField",
            "name": "viewingRoomsConnection",
            "plural": false,
            "selections": (v2/*: any*/),
            "storageKey": "viewingRoomsConnection(first:12,statuses:\"scheduled\")"
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": "partner(id:\"white-cube\")"
      }
    ]
  },
  "params": {
    "cacheID": "41e928d4fef094b1010b34b3a3c6f098",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "partner": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Partner"
        },
        "partner.currentViewingRooms": (v3/*: any*/),
        "partner.currentViewingRooms.edges": (v4/*: any*/),
        "partner.currentViewingRooms.edges.node": (v5/*: any*/),
        "partner.currentViewingRooms.edges.node.coverImage": (v6/*: any*/),
        "partner.currentViewingRooms.edges.node.coverImage.height": (v7/*: any*/),
        "partner.currentViewingRooms.edges.node.coverImage.imageURLs": (v8/*: any*/),
        "partner.currentViewingRooms.edges.node.coverImage.imageURLs.normalized": (v9/*: any*/),
        "partner.currentViewingRooms.edges.node.coverImage.width": (v7/*: any*/),
        "partner.currentViewingRooms.edges.node.exhibitionPeriod": (v9/*: any*/),
        "partner.currentViewingRooms.edges.node.href": (v9/*: any*/),
        "partner.currentViewingRooms.edges.node.internalID": (v10/*: any*/),
        "partner.currentViewingRooms.edges.node.title": (v11/*: any*/),
        "partner.id": (v10/*: any*/),
        "partner.slug": (v10/*: any*/),
        "partner.upcomingViewingRooms": (v3/*: any*/),
        "partner.upcomingViewingRooms.edges": (v4/*: any*/),
        "partner.upcomingViewingRooms.edges.node": (v5/*: any*/),
        "partner.upcomingViewingRooms.edges.node.coverImage": (v6/*: any*/),
        "partner.upcomingViewingRooms.edges.node.coverImage.height": (v7/*: any*/),
        "partner.upcomingViewingRooms.edges.node.coverImage.imageURLs": (v8/*: any*/),
        "partner.upcomingViewingRooms.edges.node.coverImage.imageURLs.normalized": (v9/*: any*/),
        "partner.upcomingViewingRooms.edges.node.coverImage.width": (v7/*: any*/),
        "partner.upcomingViewingRooms.edges.node.exhibitionPeriod": (v9/*: any*/),
        "partner.upcomingViewingRooms.edges.node.href": (v9/*: any*/),
        "partner.upcomingViewingRooms.edges.node.internalID": (v10/*: any*/),
        "partner.upcomingViewingRooms.edges.node.title": (v11/*: any*/)
      }
    },
    "name": "ViewingRooms_Test_Query",
    "operationKind": "query",
    "text": "query ViewingRooms_Test_Query {\n  partner(id: \"white-cube\") @principalField {\n    ...ViewingRooms_partner\n    id\n  }\n}\n\nfragment ViewingRoomCard_viewingRoom on ViewingRoom {\n  href\n  title\n  exhibitionPeriod\n  coverImage: image {\n    imageURLs {\n      normalized\n    }\n    width\n    height\n  }\n}\n\nfragment ViewingRooms_edges on ViewingRoomsEdge {\n  node {\n    internalID\n    ...ViewingRoomCard_viewingRoom\n  }\n}\n\nfragment ViewingRooms_partner on Partner {\n  slug\n  currentViewingRooms: viewingRoomsConnection(first: 12, statuses: live) {\n    edges {\n      node {\n        internalID\n      }\n      ...ViewingRooms_edges\n    }\n  }\n  upcomingViewingRooms: viewingRoomsConnection(first: 12, statuses: scheduled) {\n    edges {\n      node {\n        internalID\n      }\n      ...ViewingRooms_edges\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'ac1769d18e52b61b5cd0b4f32a6fb02c';
export default node;
