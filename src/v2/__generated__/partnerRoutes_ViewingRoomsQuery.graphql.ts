/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type partnerRoutes_ViewingRoomsQueryVariables = {
    partnerId: string;
};
export type partnerRoutes_ViewingRoomsQueryResponse = {
    readonly partner: {
        readonly " $fragmentRefs": FragmentRefs<"ViewingRooms_partner">;
    } | null;
};
export type partnerRoutes_ViewingRoomsQuery = {
    readonly response: partnerRoutes_ViewingRoomsQueryResponse;
    readonly variables: partnerRoutes_ViewingRoomsQueryVariables;
};



/*
query partnerRoutes_ViewingRoomsQuery(
  $partnerId: String!
) {
  partner(id: $partnerId) @principalField {
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
  "kind": "Literal",
  "name": "first",
  "value": 12
},
v3 = [
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
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "partnerRoutes_ViewingRoomsQuery",
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
            "name": "ViewingRooms_partner"
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
    "name": "partnerRoutes_ViewingRoomsQuery",
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
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "slug",
            "storageKey": null
          },
          {
            "alias": "currentViewingRooms",
            "args": [
              (v2/*: any*/),
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
            "selections": (v3/*: any*/),
            "storageKey": "viewingRoomsConnection(first:12,statuses:\"live\")"
          },
          {
            "alias": "upcomingViewingRooms",
            "args": [
              (v2/*: any*/),
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
            "selections": (v3/*: any*/),
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
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "73324145b1f14706fd16b44add5aff3a",
    "id": null,
    "metadata": {},
    "name": "partnerRoutes_ViewingRoomsQuery",
    "operationKind": "query",
    "text": "query partnerRoutes_ViewingRoomsQuery(\n  $partnerId: String!\n) {\n  partner(id: $partnerId) @principalField {\n    ...ViewingRooms_partner\n    id\n  }\n}\n\nfragment ViewingRoomCard_viewingRoom on ViewingRoom {\n  href\n  title\n  exhibitionPeriod\n  coverImage: image {\n    imageURLs {\n      normalized\n    }\n    width\n    height\n  }\n}\n\nfragment ViewingRooms_edges on ViewingRoomsEdge {\n  node {\n    internalID\n    ...ViewingRoomCard_viewingRoom\n  }\n}\n\nfragment ViewingRooms_partner on Partner {\n  slug\n  currentViewingRooms: viewingRoomsConnection(first: 12, statuses: live) {\n    edges {\n      node {\n        internalID\n      }\n      ...ViewingRooms_edges\n    }\n  }\n  upcomingViewingRooms: viewingRoomsConnection(first: 12, statuses: scheduled) {\n    edges {\n      node {\n        internalID\n      }\n      ...ViewingRooms_edges\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '3a936bbe65b85f49b27e1d593215dbd4';
export default node;
