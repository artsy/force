/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type partnersRoutes_InstitutionsRouteQueryVariables = {};
export type partnersRoutes_InstitutionsRouteQueryResponse = {
    readonly viewer: {
        readonly " $fragmentRefs": FragmentRefs<"InstitutionsRoute_viewer">;
    } | null;
};
export type partnersRoutes_InstitutionsRouteQuery = {
    readonly response: partnersRoutes_InstitutionsRouteQueryResponse;
    readonly variables: partnersRoutes_InstitutionsRouteQueryVariables;
};



/*
query partnersRoutes_InstitutionsRouteQuery {
  viewer {
    ...InstitutionsRoute_viewer
  }
}

fragment FollowProfileButton_profile on Profile {
  id
  slug
  name
  internalID
  is_followed: isFollowed
}

fragment InstitutionsRoute_viewer on Viewer {
  ...PartnersFeaturedCarousel_viewer_3Ao4DD
}

fragment PartnersFeaturedCarouselCell_profile on Profile {
  ...FollowProfileButton_profile
  owner {
    __typename
    ... on Partner {
      internalID
      name
      featuredShow {
        name
        status
        statusUpdate
        startAt(format: "MMM D")
        endAt(format: "MMM D")
        isOnlineExclusive
        location {
          city
          id
        }
        coverImage {
          resized(height: 500, version: ["normalized", "larger", "large"]) {
            src
            srcSet
          }
        }
        id
      }
    }
    ... on Node {
      id
    }
    ... on FairOrganizer {
      id
    }
  }
}

fragment PartnersFeaturedCarousel_viewer_3Ao4DD on Viewer {
  orderedSet(id: "564e181a258faf3d5c000080") {
    items {
      __typename
      ... on Profile {
        internalID
        ...PartnersFeaturedCarouselCell_profile
        id
      }
      ... on Node {
        id
      }
      ... on FeaturedLink {
        id
      }
    }
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
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
  "name": "name",
  "storageKey": null
},
v4 = [
  {
    "kind": "Literal",
    "name": "format",
    "value": "MMM D"
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "partnersRoutes_InstitutionsRouteQuery",
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
            "name": "InstitutionsRoute_viewer"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "partnersRoutes_InstitutionsRouteQuery",
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
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "id",
                "value": "564e181a258faf3d5c000080"
              }
            ],
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
                  (v0/*: any*/),
                  (v1/*: any*/),
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      (v2/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "slug",
                        "storageKey": null
                      },
                      (v3/*: any*/),
                      {
                        "alias": "is_followed",
                        "args": null,
                        "kind": "ScalarField",
                        "name": "isFollowed",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": null,
                        "kind": "LinkedField",
                        "name": "owner",
                        "plural": false,
                        "selections": [
                          (v0/*: any*/),
                          (v1/*: any*/),
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              (v2/*: any*/),
                              (v3/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "Show",
                                "kind": "LinkedField",
                                "name": "featuredShow",
                                "plural": false,
                                "selections": [
                                  (v3/*: any*/),
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
                                    "name": "statusUpdate",
                                    "storageKey": null
                                  },
                                  {
                                    "alias": null,
                                    "args": (v4/*: any*/),
                                    "kind": "ScalarField",
                                    "name": "startAt",
                                    "storageKey": "startAt(format:\"MMM D\")"
                                  },
                                  {
                                    "alias": null,
                                    "args": (v4/*: any*/),
                                    "kind": "ScalarField",
                                    "name": "endAt",
                                    "storageKey": "endAt(format:\"MMM D\")"
                                  },
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "isOnlineExclusive",
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
                                      (v1/*: any*/)
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
                                            "value": 500
                                          },
                                          {
                                            "kind": "Literal",
                                            "name": "version",
                                            "value": [
                                              "normalized",
                                              "larger",
                                              "large"
                                            ]
                                          }
                                        ],
                                        "concreteType": "ResizedImageUrl",
                                        "kind": "LinkedField",
                                        "name": "resized",
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
                                        "storageKey": "resized(height:500,version:[\"normalized\",\"larger\",\"large\"])"
                                      }
                                    ],
                                    "storageKey": null
                                  },
                                  (v1/*: any*/)
                                ],
                                "storageKey": null
                              }
                            ],
                            "type": "Partner"
                          }
                        ],
                        "storageKey": null
                      }
                    ],
                    "type": "Profile"
                  }
                ],
                "storageKey": null
              },
              (v1/*: any*/)
            ],
            "storageKey": "orderedSet(id:\"564e181a258faf3d5c000080\")"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "partnersRoutes_InstitutionsRouteQuery",
    "operationKind": "query",
    "text": "query partnersRoutes_InstitutionsRouteQuery {\n  viewer {\n    ...InstitutionsRoute_viewer\n  }\n}\n\nfragment FollowProfileButton_profile on Profile {\n  id\n  slug\n  name\n  internalID\n  is_followed: isFollowed\n}\n\nfragment InstitutionsRoute_viewer on Viewer {\n  ...PartnersFeaturedCarousel_viewer_3Ao4DD\n}\n\nfragment PartnersFeaturedCarouselCell_profile on Profile {\n  ...FollowProfileButton_profile\n  owner {\n    __typename\n    ... on Partner {\n      internalID\n      name\n      featuredShow {\n        name\n        status\n        statusUpdate\n        startAt(format: \"MMM D\")\n        endAt(format: \"MMM D\")\n        isOnlineExclusive\n        location {\n          city\n          id\n        }\n        coverImage {\n          resized(height: 500, version: [\"normalized\", \"larger\", \"large\"]) {\n            src\n            srcSet\n          }\n        }\n        id\n      }\n    }\n    ... on Node {\n      id\n    }\n    ... on FairOrganizer {\n      id\n    }\n  }\n}\n\nfragment PartnersFeaturedCarousel_viewer_3Ao4DD on Viewer {\n  orderedSet(id: \"564e181a258faf3d5c000080\") {\n    items {\n      __typename\n      ... on Profile {\n        internalID\n        ...PartnersFeaturedCarouselCell_profile\n        id\n      }\n      ... on Node {\n        id\n      }\n      ... on FeaturedLink {\n        id\n      }\n    }\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '3d638da9726e83cbc4faa0be3fe71145';
export default node;
