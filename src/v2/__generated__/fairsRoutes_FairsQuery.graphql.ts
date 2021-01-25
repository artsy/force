/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type fairsRoutes_FairsQueryVariables = {};
export type fairsRoutes_FairsQueryResponse = {
    readonly featuredFairs: ReadonlyArray<{
        readonly " $fragmentRefs": FragmentRefs<"FairsIndex_featuredFairs">;
    } | null> | null;
    readonly viewer: {
        readonly " $fragmentRefs": FragmentRefs<"FairsIndex_viewer">;
    } | null;
};
export type fairsRoutes_FairsQuery = {
    readonly response: fairsRoutes_FairsQueryResponse;
    readonly variables: fairsRoutes_FairsQueryVariables;
};



/*
query fairsRoutes_FairsQuery {
  featuredFairs: orderedSets(key: "art-fairs:featured") {
    ...FairsIndex_featuredFairs
    id
  }
  viewer {
    ...FairsIndex_viewer
  }
}

fragment FairsFairBanner_fair on Fair {
  href
  name
  startAt(format: "MMM Do")
  endAt(format: "Do YYYY")
  bannerSize
  image {
    large: cropped(width: 1112, height: 477, version: ["wide"]) {
      src
      srcSet
      width
      height
    }
    small: cropped(width: 556, height: 313, version: ["wide"]) {
      src
      srcSet
      width
      height
    }
  }
  profile {
    icon {
      resized(width: 80, height: 80, version: "square140") {
        width
        height
        src
        srcSet
      }
    }
    id
  }
}

fragment FairsFairRow_fair on Fair {
  href
  name
  startAt(format: "MMM Do")
  endAt(format: "Do YYYY")
  profile {
    icon {
      resized(width: 80, height: 80, version: "square140") {
        width
        height
        src
        srcSet
      }
    }
    id
  }
}

fragment FairsIndex_featuredFairs on OrderedSet {
  items {
    __typename
    ... on FeaturedLink {
      internalID
      title
      image {
        cropped(width: 547, height: 410) {
          width
          height
          src
          srcSet
        }
      }
      id
    }
    ... on Node {
      id
    }
  }
}

fragment FairsIndex_viewer on Viewer {
  runningFairs: fairs(hasListing: true, hasFullFeature: true, sort: START_AT_DESC, size: 25, status: RUNNING) {
    internalID
    bannerSize
    isPublished
    profile {
      isPublished
      id
    }
    ...FairsFairBanner_fair
    ...FairsFairRow_fair
    id
  }
  closedFairs: fairs(hasListing: true, hasFullFeature: true, sort: START_AT_DESC, size: 25, status: CLOSED) {
    internalID
    isPublished
    profile {
      isPublished
      id
    }
    ...FairsFairRow_fair
    id
  }
  upcomingFairs: fairs(hasListing: true, hasFullFeature: true, sort: START_AT_ASC, size: 25, status: UPCOMING) {
    internalID
    name
    href
    startAt(format: "MMM Do")
    endAt(format: "Do YYYY")
    location {
      city
      id
    }
    isPublished
    profile {
      isPublished
      id
    }
    ...FairsFairRow_fair
    id
  }
  ...FairsPastFairs_viewer
}

fragment FairsPastFairs_viewer on Viewer {
  pastFairs: fairsConnection(hasListing: true, hasFullFeature: true, sort: START_AT_DESC, status: CLOSED, first: 15) {
    edges {
      node {
        internalID
        isPublished
        profile {
          isPublished
          id
        }
        ...FairsFairRow_fair
        id
        __typename
      }
      cursor
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}
*/

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
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "width",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "height",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "src",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "srcSet",
  "storageKey": null
},
v8 = [
  (v4/*: any*/),
  (v5/*: any*/),
  (v6/*: any*/),
  (v7/*: any*/)
],
v9 = {
  "kind": "Literal",
  "name": "hasFullFeature",
  "value": true
},
v10 = {
  "kind": "Literal",
  "name": "hasListing",
  "value": true
},
v11 = {
  "kind": "Literal",
  "name": "size",
  "value": 25
},
v12 = {
  "kind": "Literal",
  "name": "sort",
  "value": "START_AT_DESC"
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isPublished",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "concreteType": "Profile",
  "kind": "LinkedField",
  "name": "profile",
  "plural": false,
  "selections": [
    (v13/*: any*/),
    (v2/*: any*/),
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
          "selections": (v8/*: any*/),
          "storageKey": "resized(height:80,version:\"square140\",width:80)"
        }
      ],
      "storageKey": null
    }
  ],
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v17 = {
  "alias": null,
  "args": [
    {
      "kind": "Literal",
      "name": "format",
      "value": "MMM Do"
    }
  ],
  "kind": "ScalarField",
  "name": "startAt",
  "storageKey": "startAt(format:\"MMM Do\")"
},
v18 = {
  "alias": null,
  "args": [
    {
      "kind": "Literal",
      "name": "format",
      "value": "Do YYYY"
    }
  ],
  "kind": "ScalarField",
  "name": "endAt",
  "storageKey": "endAt(format:\"Do YYYY\")"
},
v19 = {
  "kind": "Literal",
  "name": "version",
  "value": [
    "wide"
  ]
},
v20 = [
  (v6/*: any*/),
  (v7/*: any*/),
  (v4/*: any*/),
  (v5/*: any*/)
],
v21 = {
  "kind": "Literal",
  "name": "status",
  "value": "CLOSED"
},
v22 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 15
  },
  (v9/*: any*/),
  (v10/*: any*/),
  (v12/*: any*/),
  (v21/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "fairsRoutes_FairsQuery",
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
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "fairsRoutes_FairsQuery",
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
              (v2/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": [
                  (v3/*: any*/),
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
                        "selections": (v8/*: any*/),
                        "storageKey": "cropped(height:410,width:547)"
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "type": "FeaturedLink"
              }
            ],
            "storageKey": null
          },
          (v2/*: any*/)
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
              (v9/*: any*/),
              (v10/*: any*/),
              (v11/*: any*/),
              (v12/*: any*/),
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
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "bannerSize",
                "storageKey": null
              },
              (v13/*: any*/),
              (v14/*: any*/),
              (v15/*: any*/),
              (v16/*: any*/),
              (v17/*: any*/),
              (v18/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Image",
                "kind": "LinkedField",
                "name": "image",
                "plural": false,
                "selections": [
                  {
                    "alias": "large",
                    "args": [
                      {
                        "kind": "Literal",
                        "name": "height",
                        "value": 477
                      },
                      (v19/*: any*/),
                      {
                        "kind": "Literal",
                        "name": "width",
                        "value": 1112
                      }
                    ],
                    "concreteType": "CroppedImageUrl",
                    "kind": "LinkedField",
                    "name": "cropped",
                    "plural": false,
                    "selections": (v20/*: any*/),
                    "storageKey": "cropped(height:477,version:[\"wide\"],width:1112)"
                  },
                  {
                    "alias": "small",
                    "args": [
                      {
                        "kind": "Literal",
                        "name": "height",
                        "value": 313
                      },
                      (v19/*: any*/),
                      {
                        "kind": "Literal",
                        "name": "width",
                        "value": 556
                      }
                    ],
                    "concreteType": "CroppedImageUrl",
                    "kind": "LinkedField",
                    "name": "cropped",
                    "plural": false,
                    "selections": (v20/*: any*/),
                    "storageKey": "cropped(height:313,version:[\"wide\"],width:556)"
                  }
                ],
                "storageKey": null
              },
              (v2/*: any*/)
            ],
            "storageKey": "fairs(hasFullFeature:true,hasListing:true,size:25,sort:\"START_AT_DESC\",status:\"RUNNING\")"
          },
          {
            "alias": "closedFairs",
            "args": [
              (v9/*: any*/),
              (v10/*: any*/),
              (v11/*: any*/),
              (v12/*: any*/),
              (v21/*: any*/)
            ],
            "concreteType": "Fair",
            "kind": "LinkedField",
            "name": "fairs",
            "plural": true,
            "selections": [
              (v3/*: any*/),
              (v13/*: any*/),
              (v14/*: any*/),
              (v15/*: any*/),
              (v16/*: any*/),
              (v17/*: any*/),
              (v18/*: any*/),
              (v2/*: any*/)
            ],
            "storageKey": "fairs(hasFullFeature:true,hasListing:true,size:25,sort:\"START_AT_DESC\",status:\"CLOSED\")"
          },
          {
            "alias": "upcomingFairs",
            "args": [
              (v9/*: any*/),
              (v10/*: any*/),
              (v11/*: any*/),
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
              (v3/*: any*/),
              (v16/*: any*/),
              (v15/*: any*/),
              (v17/*: any*/),
              (v18/*: any*/),
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
                  (v2/*: any*/)
                ],
                "storageKey": null
              },
              (v13/*: any*/),
              (v14/*: any*/),
              (v2/*: any*/)
            ],
            "storageKey": "fairs(hasFullFeature:true,hasListing:true,size:25,sort:\"START_AT_ASC\",status:\"UPCOMING\")"
          },
          {
            "alias": "pastFairs",
            "args": (v22/*: any*/),
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
                      (v3/*: any*/),
                      (v13/*: any*/),
                      (v14/*: any*/),
                      (v15/*: any*/),
                      (v16/*: any*/),
                      (v17/*: any*/),
                      (v18/*: any*/),
                      (v2/*: any*/),
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
            "args": (v22/*: any*/),
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
    "id": null,
    "metadata": {},
    "name": "fairsRoutes_FairsQuery",
    "operationKind": "query",
    "text": "query fairsRoutes_FairsQuery {\n  featuredFairs: orderedSets(key: \"art-fairs:featured\") {\n    ...FairsIndex_featuredFairs\n    id\n  }\n  viewer {\n    ...FairsIndex_viewer\n  }\n}\n\nfragment FairsFairBanner_fair on Fair {\n  href\n  name\n  startAt(format: \"MMM Do\")\n  endAt(format: \"Do YYYY\")\n  bannerSize\n  image {\n    large: cropped(width: 1112, height: 477, version: [\"wide\"]) {\n      src\n      srcSet\n      width\n      height\n    }\n    small: cropped(width: 556, height: 313, version: [\"wide\"]) {\n      src\n      srcSet\n      width\n      height\n    }\n  }\n  profile {\n    icon {\n      resized(width: 80, height: 80, version: \"square140\") {\n        width\n        height\n        src\n        srcSet\n      }\n    }\n    id\n  }\n}\n\nfragment FairsFairRow_fair on Fair {\n  href\n  name\n  startAt(format: \"MMM Do\")\n  endAt(format: \"Do YYYY\")\n  profile {\n    icon {\n      resized(width: 80, height: 80, version: \"square140\") {\n        width\n        height\n        src\n        srcSet\n      }\n    }\n    id\n  }\n}\n\nfragment FairsIndex_featuredFairs on OrderedSet {\n  items {\n    __typename\n    ... on FeaturedLink {\n      internalID\n      title\n      image {\n        cropped(width: 547, height: 410) {\n          width\n          height\n          src\n          srcSet\n        }\n      }\n      id\n    }\n    ... on Node {\n      id\n    }\n  }\n}\n\nfragment FairsIndex_viewer on Viewer {\n  runningFairs: fairs(hasListing: true, hasFullFeature: true, sort: START_AT_DESC, size: 25, status: RUNNING) {\n    internalID\n    bannerSize\n    isPublished\n    profile {\n      isPublished\n      id\n    }\n    ...FairsFairBanner_fair\n    ...FairsFairRow_fair\n    id\n  }\n  closedFairs: fairs(hasListing: true, hasFullFeature: true, sort: START_AT_DESC, size: 25, status: CLOSED) {\n    internalID\n    isPublished\n    profile {\n      isPublished\n      id\n    }\n    ...FairsFairRow_fair\n    id\n  }\n  upcomingFairs: fairs(hasListing: true, hasFullFeature: true, sort: START_AT_ASC, size: 25, status: UPCOMING) {\n    internalID\n    name\n    href\n    startAt(format: \"MMM Do\")\n    endAt(format: \"Do YYYY\")\n    location {\n      city\n      id\n    }\n    isPublished\n    profile {\n      isPublished\n      id\n    }\n    ...FairsFairRow_fair\n    id\n  }\n  ...FairsPastFairs_viewer\n}\n\nfragment FairsPastFairs_viewer on Viewer {\n  pastFairs: fairsConnection(hasListing: true, hasFullFeature: true, sort: START_AT_DESC, status: CLOSED, first: 15) {\n    edges {\n      node {\n        internalID\n        isPublished\n        profile {\n          isPublished\n          id\n        }\n        ...FairsFairRow_fair\n        id\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '80026daec7f1a6020d34916a54a90def';
export default node;
