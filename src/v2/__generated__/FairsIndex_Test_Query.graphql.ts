/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FairsIndex_Test_QueryVariables = {};
export type FairsIndex_Test_QueryResponse = {
    readonly featuredFairs: ReadonlyArray<{
        readonly " $fragmentRefs": FragmentRefs<"FairsIndex_featuredFairs">;
    } | null> | null;
    readonly viewer: {
        readonly " $fragmentRefs": FragmentRefs<"FairsIndex_viewer">;
    } | null;
};
export type FairsIndex_Test_Query = {
    readonly response: FairsIndex_Test_QueryResponse;
    readonly variables: FairsIndex_Test_QueryVariables;
};



/*
query FairsIndex_Test_Query {
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
  exhibitionPeriod
  bannerSize
  image {
    large: cropped(width: 1840, height: 790, version: ["wide"]) {
      src
      srcSet
      width
      height
    }
    small: cropped(width: 910, height: 512, version: ["wide"]) {
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
  isoStartAt: startAt
  exhibitionPeriod
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
  organizer {
    profile {
      href
      id
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
    ... on Profile {
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
    exhibitionPeriod
    location {
      city
      id
    }
    isPublished
    profile {
      isPublished
      id
    }
    organizer {
      profile {
        href
        id
      }
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
  "args": null,
  "kind": "ScalarField",
  "name": "exhibitionPeriod",
  "storageKey": null
},
v18 = {
  "kind": "Literal",
  "name": "version",
  "value": [
    "wide"
  ]
},
v19 = [
  (v6/*: any*/),
  (v7/*: any*/),
  (v4/*: any*/),
  (v5/*: any*/)
],
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
        (v15/*: any*/),
        (v2/*: any*/)
      ],
      "storageKey": null
    },
    (v2/*: any*/)
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
  (v9/*: any*/),
  (v10/*: any*/),
  (v12/*: any*/),
  (v22/*: any*/)
],
v24 = {
  "type": "ID",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v25 = {
  "type": "Fair",
  "enumValues": null,
  "plural": true,
  "nullable": true
},
v26 = {
  "type": "ID",
  "enumValues": null,
  "plural": false,
  "nullable": false
},
v27 = {
  "type": "String",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v28 = {
  "type": "Boolean",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v29 = {
  "type": "Profile",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v30 = {
  "type": "FairOrganizer",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v31 = {
  "type": "Image",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v32 = {
  "type": "CroppedImageUrl",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v33 = {
  "type": "Int",
  "enumValues": null,
  "plural": false,
  "nullable": false
},
v34 = {
  "type": "String",
  "enumValues": null,
  "plural": false,
  "nullable": false
},
v35 = {
  "type": "ResizedImageUrl",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v36 = {
  "type": "Int",
  "enumValues": null,
  "plural": false,
  "nullable": true
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "FairsIndex_Test_Query",
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
    "name": "FairsIndex_Test_Query",
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
                        "value": 790
                      },
                      (v18/*: any*/),
                      {
                        "kind": "Literal",
                        "name": "width",
                        "value": 1840
                      }
                    ],
                    "concreteType": "CroppedImageUrl",
                    "kind": "LinkedField",
                    "name": "cropped",
                    "plural": false,
                    "selections": (v19/*: any*/),
                    "storageKey": "cropped(height:790,version:[\"wide\"],width:1840)"
                  },
                  {
                    "alias": "small",
                    "args": [
                      {
                        "kind": "Literal",
                        "name": "height",
                        "value": 512
                      },
                      (v18/*: any*/),
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
                    "selections": (v19/*: any*/),
                    "storageKey": "cropped(height:512,version:[\"wide\"],width:910)"
                  }
                ],
                "storageKey": null
              },
              (v20/*: any*/),
              (v21/*: any*/),
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
              (v22/*: any*/)
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
              (v20/*: any*/),
              (v17/*: any*/),
              (v21/*: any*/),
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
              (v17/*: any*/),
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
              (v21/*: any*/),
              (v15/*: any*/),
              (v20/*: any*/),
              (v2/*: any*/)
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
                      (v3/*: any*/),
                      (v13/*: any*/),
                      (v14/*: any*/),
                      (v15/*: any*/),
                      (v16/*: any*/),
                      (v20/*: any*/),
                      (v17/*: any*/),
                      (v21/*: any*/),
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
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "featuredFairs": {
          "type": "OrderedSet",
          "enumValues": null,
          "plural": true,
          "nullable": true
        },
        "viewer": {
          "type": "Viewer",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "featuredFairs.id": (v24/*: any*/),
        "featuredFairs.items": {
          "type": "OrderedSetItem",
          "enumValues": null,
          "plural": true,
          "nullable": true
        },
        "viewer.runningFairs": (v25/*: any*/),
        "viewer.closedFairs": (v25/*: any*/),
        "viewer.upcomingFairs": (v25/*: any*/),
        "viewer.runningFairs.internalID": (v26/*: any*/),
        "viewer.runningFairs.bannerSize": (v27/*: any*/),
        "viewer.runningFairs.isPublished": (v28/*: any*/),
        "viewer.runningFairs.profile": (v29/*: any*/),
        "viewer.runningFairs.id": (v24/*: any*/),
        "viewer.closedFairs.internalID": (v26/*: any*/),
        "viewer.closedFairs.isPublished": (v28/*: any*/),
        "viewer.closedFairs.profile": (v29/*: any*/),
        "viewer.closedFairs.id": (v24/*: any*/),
        "viewer.upcomingFairs.internalID": (v26/*: any*/),
        "viewer.upcomingFairs.name": (v27/*: any*/),
        "viewer.upcomingFairs.exhibitionPeriod": (v27/*: any*/),
        "viewer.upcomingFairs.location": {
          "type": "Location",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "viewer.upcomingFairs.isPublished": (v28/*: any*/),
        "viewer.upcomingFairs.profile": (v29/*: any*/),
        "viewer.upcomingFairs.organizer": (v30/*: any*/),
        "viewer.upcomingFairs.id": (v24/*: any*/),
        "viewer.pastFairs": {
          "type": "FairConnection",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "featuredFairs.items.internalID": (v27/*: any*/),
        "featuredFairs.items.title": (v27/*: any*/),
        "featuredFairs.items.image": (v31/*: any*/),
        "featuredFairs.items.id": (v24/*: any*/),
        "viewer.runningFairs.profile.isPublished": (v28/*: any*/),
        "viewer.runningFairs.profile.id": (v24/*: any*/),
        "viewer.runningFairs.href": (v27/*: any*/),
        "viewer.runningFairs.name": (v27/*: any*/),
        "viewer.runningFairs.exhibitionPeriod": (v27/*: any*/),
        "viewer.runningFairs.image": (v31/*: any*/),
        "viewer.runningFairs.isoStartAt": (v27/*: any*/),
        "viewer.runningFairs.organizer": (v30/*: any*/),
        "viewer.closedFairs.profile.isPublished": (v28/*: any*/),
        "viewer.closedFairs.profile.id": (v24/*: any*/),
        "viewer.closedFairs.href": (v27/*: any*/),
        "viewer.closedFairs.name": (v27/*: any*/),
        "viewer.closedFairs.isoStartAt": (v27/*: any*/),
        "viewer.closedFairs.exhibitionPeriod": (v27/*: any*/),
        "viewer.closedFairs.organizer": (v30/*: any*/),
        "viewer.upcomingFairs.location.city": (v27/*: any*/),
        "viewer.upcomingFairs.location.id": (v24/*: any*/),
        "viewer.upcomingFairs.profile.isPublished": (v28/*: any*/),
        "viewer.upcomingFairs.profile.id": (v24/*: any*/),
        "viewer.upcomingFairs.organizer.profile": (v29/*: any*/),
        "viewer.upcomingFairs.organizer.id": (v24/*: any*/),
        "viewer.upcomingFairs.href": (v27/*: any*/),
        "viewer.upcomingFairs.isoStartAt": (v27/*: any*/),
        "viewer.pastFairs.edges": {
          "type": "FairEdge",
          "enumValues": null,
          "plural": true,
          "nullable": true
        },
        "viewer.pastFairs.pageInfo": {
          "type": "PageInfo",
          "enumValues": null,
          "plural": false,
          "nullable": false
        },
        "featuredFairs.items.image.cropped": (v32/*: any*/),
        "viewer.runningFairs.image.large": (v32/*: any*/),
        "viewer.runningFairs.image.small": (v32/*: any*/),
        "viewer.runningFairs.profile.icon": (v31/*: any*/),
        "viewer.runningFairs.organizer.profile": (v29/*: any*/),
        "viewer.runningFairs.organizer.id": (v24/*: any*/),
        "viewer.closedFairs.profile.icon": (v31/*: any*/),
        "viewer.closedFairs.organizer.profile": (v29/*: any*/),
        "viewer.closedFairs.organizer.id": (v24/*: any*/),
        "viewer.upcomingFairs.organizer.profile.href": (v27/*: any*/),
        "viewer.upcomingFairs.organizer.profile.id": (v24/*: any*/),
        "viewer.upcomingFairs.profile.icon": (v31/*: any*/),
        "viewer.pastFairs.edges.node": {
          "type": "Fair",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "featuredFairs.items.image.cropped.width": (v33/*: any*/),
        "featuredFairs.items.image.cropped.height": (v33/*: any*/),
        "featuredFairs.items.image.cropped.src": (v34/*: any*/),
        "featuredFairs.items.image.cropped.srcSet": (v34/*: any*/),
        "viewer.runningFairs.image.large.src": (v34/*: any*/),
        "viewer.runningFairs.image.large.srcSet": (v34/*: any*/),
        "viewer.runningFairs.image.large.width": (v33/*: any*/),
        "viewer.runningFairs.image.large.height": (v33/*: any*/),
        "viewer.runningFairs.image.small.src": (v34/*: any*/),
        "viewer.runningFairs.image.small.srcSet": (v34/*: any*/),
        "viewer.runningFairs.image.small.width": (v33/*: any*/),
        "viewer.runningFairs.image.small.height": (v33/*: any*/),
        "viewer.runningFairs.profile.icon.resized": (v35/*: any*/),
        "viewer.runningFairs.organizer.profile.href": (v27/*: any*/),
        "viewer.runningFairs.organizer.profile.id": (v24/*: any*/),
        "viewer.closedFairs.profile.icon.resized": (v35/*: any*/),
        "viewer.closedFairs.organizer.profile.href": (v27/*: any*/),
        "viewer.closedFairs.organizer.profile.id": (v24/*: any*/),
        "viewer.upcomingFairs.profile.icon.resized": (v35/*: any*/),
        "viewer.pastFairs.edges.node.internalID": (v26/*: any*/),
        "viewer.pastFairs.edges.node.isPublished": (v28/*: any*/),
        "viewer.pastFairs.edges.node.profile": (v29/*: any*/),
        "viewer.pastFairs.edges.node.id": (v24/*: any*/),
        "viewer.pastFairs.edges.cursor": (v34/*: any*/),
        "viewer.pastFairs.pageInfo.endCursor": (v27/*: any*/),
        "viewer.pastFairs.pageInfo.hasNextPage": {
          "type": "Boolean",
          "enumValues": null,
          "plural": false,
          "nullable": false
        },
        "viewer.runningFairs.profile.icon.resized.width": (v36/*: any*/),
        "viewer.runningFairs.profile.icon.resized.height": (v36/*: any*/),
        "viewer.runningFairs.profile.icon.resized.src": (v34/*: any*/),
        "viewer.runningFairs.profile.icon.resized.srcSet": (v34/*: any*/),
        "viewer.closedFairs.profile.icon.resized.width": (v36/*: any*/),
        "viewer.closedFairs.profile.icon.resized.height": (v36/*: any*/),
        "viewer.closedFairs.profile.icon.resized.src": (v34/*: any*/),
        "viewer.closedFairs.profile.icon.resized.srcSet": (v34/*: any*/),
        "viewer.upcomingFairs.profile.icon.resized.width": (v36/*: any*/),
        "viewer.upcomingFairs.profile.icon.resized.height": (v36/*: any*/),
        "viewer.upcomingFairs.profile.icon.resized.src": (v34/*: any*/),
        "viewer.upcomingFairs.profile.icon.resized.srcSet": (v34/*: any*/),
        "viewer.pastFairs.edges.node.profile.isPublished": (v28/*: any*/),
        "viewer.pastFairs.edges.node.profile.id": (v24/*: any*/),
        "viewer.pastFairs.edges.node.href": (v27/*: any*/),
        "viewer.pastFairs.edges.node.name": (v27/*: any*/),
        "viewer.pastFairs.edges.node.isoStartAt": (v27/*: any*/),
        "viewer.pastFairs.edges.node.exhibitionPeriod": (v27/*: any*/),
        "viewer.pastFairs.edges.node.organizer": (v30/*: any*/),
        "viewer.pastFairs.edges.node.__typename": (v34/*: any*/),
        "viewer.pastFairs.edges.node.profile.icon": (v31/*: any*/),
        "viewer.pastFairs.edges.node.organizer.profile": (v29/*: any*/),
        "viewer.pastFairs.edges.node.organizer.id": (v24/*: any*/),
        "viewer.pastFairs.edges.node.profile.icon.resized": (v35/*: any*/),
        "viewer.pastFairs.edges.node.organizer.profile.href": (v27/*: any*/),
        "viewer.pastFairs.edges.node.organizer.profile.id": (v24/*: any*/),
        "viewer.pastFairs.edges.node.profile.icon.resized.width": (v36/*: any*/),
        "viewer.pastFairs.edges.node.profile.icon.resized.height": (v36/*: any*/),
        "viewer.pastFairs.edges.node.profile.icon.resized.src": (v34/*: any*/),
        "viewer.pastFairs.edges.node.profile.icon.resized.srcSet": (v34/*: any*/)
      }
    },
    "name": "FairsIndex_Test_Query",
    "operationKind": "query",
    "text": "query FairsIndex_Test_Query {\n  featuredFairs: orderedSets(key: \"art-fairs:featured\") {\n    ...FairsIndex_featuredFairs\n    id\n  }\n  viewer {\n    ...FairsIndex_viewer\n  }\n}\n\nfragment FairsFairBanner_fair on Fair {\n  href\n  name\n  exhibitionPeriod\n  bannerSize\n  image {\n    large: cropped(width: 1840, height: 790, version: [\"wide\"]) {\n      src\n      srcSet\n      width\n      height\n    }\n    small: cropped(width: 910, height: 512, version: [\"wide\"]) {\n      src\n      srcSet\n      width\n      height\n    }\n  }\n  profile {\n    icon {\n      resized(width: 80, height: 80, version: \"square140\") {\n        width\n        height\n        src\n        srcSet\n      }\n    }\n    id\n  }\n}\n\nfragment FairsFairRow_fair on Fair {\n  href\n  name\n  isoStartAt: startAt\n  exhibitionPeriod\n  profile {\n    icon {\n      resized(width: 80, height: 80, version: \"square140\") {\n        width\n        height\n        src\n        srcSet\n      }\n    }\n    id\n  }\n  organizer {\n    profile {\n      href\n      id\n    }\n    id\n  }\n}\n\nfragment FairsIndex_featuredFairs on OrderedSet {\n  items {\n    __typename\n    ... on FeaturedLink {\n      internalID\n      title\n      image {\n        cropped(width: 547, height: 410) {\n          width\n          height\n          src\n          srcSet\n        }\n      }\n      id\n    }\n    ... on Node {\n      id\n    }\n    ... on Profile {\n      id\n    }\n  }\n}\n\nfragment FairsIndex_viewer on Viewer {\n  runningFairs: fairs(hasListing: true, hasFullFeature: true, sort: START_AT_DESC, size: 25, status: RUNNING) {\n    internalID\n    bannerSize\n    isPublished\n    profile {\n      isPublished\n      id\n    }\n    ...FairsFairBanner_fair\n    ...FairsFairRow_fair\n    id\n  }\n  closedFairs: fairs(hasListing: true, hasFullFeature: true, sort: START_AT_DESC, size: 25, status: CLOSED) {\n    internalID\n    isPublished\n    profile {\n      isPublished\n      id\n    }\n    ...FairsFairRow_fair\n    id\n  }\n  upcomingFairs: fairs(hasListing: true, hasFullFeature: true, sort: START_AT_ASC, size: 25, status: UPCOMING) {\n    internalID\n    name\n    exhibitionPeriod\n    location {\n      city\n      id\n    }\n    isPublished\n    profile {\n      isPublished\n      id\n    }\n    organizer {\n      profile {\n        href\n        id\n      }\n      id\n    }\n    ...FairsFairRow_fair\n    id\n  }\n  ...FairsPastFairs_viewer\n}\n\nfragment FairsPastFairs_viewer on Viewer {\n  pastFairs: fairsConnection(hasListing: true, hasFullFeature: true, sort: START_AT_DESC, status: CLOSED, first: 15) {\n    edges {\n      node {\n        internalID\n        isPublished\n        profile {\n          isPublished\n          id\n        }\n        ...FairsFairRow_fair\n        id\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'a4ec4099482420eff47b1546822880b8';
export default node;
