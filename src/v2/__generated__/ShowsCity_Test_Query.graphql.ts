/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ShowsCity_Test_QueryVariables = {};
export type ShowsCity_Test_QueryResponse = {
    readonly viewer: {
        readonly " $fragmentRefs": FragmentRefs<"ShowsCity_viewer">;
    } | null;
    readonly city: {
        readonly " $fragmentRefs": FragmentRefs<"ShowsCity_city">;
    } | null;
};
export type ShowsCity_Test_Query = {
    readonly response: ShowsCity_Test_QueryResponse;
    readonly variables: ShowsCity_Test_QueryVariables;
};



/*
query ShowsCity_Test_Query {
  viewer {
    ...ShowsCity_viewer
  }
  city(slug: "example") {
    ...ShowsCity_city
  }
}

fragment Pagination_pageCursors on PageCursors {
  around {
    cursor
    page
    isCurrent
  }
  first {
    cursor
    page
    isCurrent
  }
  last {
    cursor
    page
    isCurrent
  }
  previous {
    cursor
    page
  }
}

fragment ShowsCity_city on City {
  name
  slug
  upcomingShows: showsConnection(first: 18, status: UPCOMING, sort: START_AT_ASC) {
    edges {
      node {
        internalID
        startAt
        ...ShowsFeaturedShow_show
        id
      }
    }
  }
  currentShows: showsConnection(first: 18, status: RUNNING, sort: END_AT_ASC) {
    pageInfo {
      hasNextPage
      endCursor
    }
    pageCursors {
      ...Pagination_pageCursors
    }
    totalCount
    edges {
      node {
        internalID
        ...ShowsFeaturedShow_show
        id
      }
    }
  }
  pastShows: showsConnection(first: 18, status: CLOSED) {
    edges {
      node {
        internalID
        ...ShowsFeaturedShow_show
        id
      }
    }
  }
}

fragment ShowsCity_viewer on Viewer {
  ...ShowsHeader_viewer
}

fragment ShowsFeaturedShow_show on Show {
  ...ShowsShowDates_show
  id
  name
  href
  coverImage {
    title
    large: cropped(width: 910, height: 683) {
      width
      height
      src
      srcSet
    }
    small: cropped(width: 600, height: 450) {
      width
      height
      src
      srcSet
    }
  }
  partner {
    __typename
    ... on Partner {
      name
    }
    ... on ExternalPartner {
      name
      id
    }
    ... on Node {
      id
    }
  }
}

fragment ShowsHeader_viewer on Viewer {
  allCities: cities {
    text: name
    value: slug
  }
  featuredCities: cities(featured: true) {
    text: name
    value: slug
  }
}

fragment ShowsShowDates_show on Show {
  startAt
  endAt
  formattedStartAt: startAt(format: "MMM D")
  formattedEndAt: endAt(format: "MMM D")
  location {
    city
    id
  }
}
*/

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
v6 = [
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
v7 = [
  (v2/*: any*/)
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
              "selections": (v6/*: any*/),
              "storageKey": "cropped(height:683,width:910)"
            },
            {
              "alias": "small",
              "args": [
                {
                  "kind": "Literal",
                  "name": "height",
                  "value": 450
                },
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
              "selections": (v6/*: any*/),
              "storageKey": "cropped(height:450,width:600)"
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
            (v5/*: any*/),
            {
              "kind": "InlineFragment",
              "selections": (v7/*: any*/),
              "type": "Partner"
            },
            {
              "kind": "InlineFragment",
              "selections": (v7/*: any*/),
              "type": "ExternalPartner"
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
  "type": "String",
  "enumValues": null,
  "plural": false,
  "nullable": false
},
v14 = {
  "type": "ShowConnection",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v15 = {
  "type": "City",
  "enumValues": null,
  "plural": true,
  "nullable": false
},
v16 = {
  "type": "ShowEdge",
  "enumValues": null,
  "plural": true,
  "nullable": true
},
v17 = {
  "type": "Show",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v18 = {
  "type": "Boolean",
  "enumValues": null,
  "plural": false,
  "nullable": false
},
v19 = {
  "type": "String",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v20 = {
  "type": "ID",
  "enumValues": null,
  "plural": false,
  "nullable": false
},
v21 = {
  "type": "PageCursor",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v22 = {
  "type": "Image",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v23 = {
  "type": "PartnerTypes",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v24 = {
  "type": "Int",
  "enumValues": null,
  "plural": false,
  "nullable": false
},
v25 = {
  "type": "Location",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v26 = {
  "type": "CroppedImageUrl",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v27 = {
  "type": "ID",
  "enumValues": null,
  "plural": false,
  "nullable": true
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
    "type": "Query"
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
                "name": "status",
                "value": "CLOSED"
              }
            ],
            "concreteType": "ShowConnection",
            "kind": "LinkedField",
            "name": "showsConnection",
            "plural": false,
            "selections": (v9/*: any*/),
            "storageKey": "showsConnection(first:18,status:\"CLOSED\")"
          }
        ],
        "storageKey": "city(slug:\"example\")"
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "viewer": {
          "type": "Viewer",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "city": {
          "type": "City",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "city.name": (v13/*: any*/),
        "city.slug": (v13/*: any*/),
        "city.upcomingShows": (v14/*: any*/),
        "city.currentShows": (v14/*: any*/),
        "city.pastShows": (v14/*: any*/),
        "viewer.allCities": (v15/*: any*/),
        "viewer.featuredCities": (v15/*: any*/),
        "city.upcomingShows.edges": (v16/*: any*/),
        "city.currentShows.pageInfo": {
          "type": "PageInfo",
          "enumValues": null,
          "plural": false,
          "nullable": false
        },
        "city.currentShows.pageCursors": {
          "type": "PageCursors",
          "enumValues": null,
          "plural": false,
          "nullable": false
        },
        "city.currentShows.totalCount": {
          "type": "Int",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "city.currentShows.edges": (v16/*: any*/),
        "city.pastShows.edges": (v16/*: any*/),
        "viewer.allCities.text": (v13/*: any*/),
        "viewer.allCities.value": (v13/*: any*/),
        "viewer.featuredCities.text": (v13/*: any*/),
        "viewer.featuredCities.value": (v13/*: any*/),
        "city.upcomingShows.edges.node": (v17/*: any*/),
        "city.currentShows.pageInfo.hasNextPage": (v18/*: any*/),
        "city.currentShows.pageInfo.endCursor": (v19/*: any*/),
        "city.currentShows.edges.node": (v17/*: any*/),
        "city.pastShows.edges.node": (v17/*: any*/),
        "city.upcomingShows.edges.node.internalID": (v20/*: any*/),
        "city.upcomingShows.edges.node.startAt": (v19/*: any*/),
        "city.upcomingShows.edges.node.id": (v20/*: any*/),
        "city.currentShows.pageCursors.around": {
          "type": "PageCursor",
          "enumValues": null,
          "plural": true,
          "nullable": false
        },
        "city.currentShows.pageCursors.first": (v21/*: any*/),
        "city.currentShows.pageCursors.last": (v21/*: any*/),
        "city.currentShows.pageCursors.previous": (v21/*: any*/),
        "city.currentShows.edges.node.internalID": (v20/*: any*/),
        "city.currentShows.edges.node.id": (v20/*: any*/),
        "city.pastShows.edges.node.internalID": (v20/*: any*/),
        "city.pastShows.edges.node.id": (v20/*: any*/),
        "city.upcomingShows.edges.node.name": (v19/*: any*/),
        "city.upcomingShows.edges.node.href": (v19/*: any*/),
        "city.upcomingShows.edges.node.coverImage": (v22/*: any*/),
        "city.upcomingShows.edges.node.partner": (v23/*: any*/),
        "city.currentShows.pageCursors.around.cursor": (v13/*: any*/),
        "city.currentShows.pageCursors.around.page": (v24/*: any*/),
        "city.currentShows.pageCursors.around.isCurrent": (v18/*: any*/),
        "city.currentShows.pageCursors.first.cursor": (v13/*: any*/),
        "city.currentShows.pageCursors.first.page": (v24/*: any*/),
        "city.currentShows.pageCursors.first.isCurrent": (v18/*: any*/),
        "city.currentShows.pageCursors.last.cursor": (v13/*: any*/),
        "city.currentShows.pageCursors.last.page": (v24/*: any*/),
        "city.currentShows.pageCursors.last.isCurrent": (v18/*: any*/),
        "city.currentShows.pageCursors.previous.cursor": (v13/*: any*/),
        "city.currentShows.pageCursors.previous.page": (v24/*: any*/),
        "city.currentShows.edges.node.name": (v19/*: any*/),
        "city.currentShows.edges.node.href": (v19/*: any*/),
        "city.currentShows.edges.node.coverImage": (v22/*: any*/),
        "city.currentShows.edges.node.partner": (v23/*: any*/),
        "city.pastShows.edges.node.name": (v19/*: any*/),
        "city.pastShows.edges.node.href": (v19/*: any*/),
        "city.pastShows.edges.node.coverImage": (v22/*: any*/),
        "city.pastShows.edges.node.partner": (v23/*: any*/),
        "city.upcomingShows.edges.node.endAt": (v19/*: any*/),
        "city.upcomingShows.edges.node.formattedStartAt": (v19/*: any*/),
        "city.upcomingShows.edges.node.formattedEndAt": (v19/*: any*/),
        "city.upcomingShows.edges.node.location": (v25/*: any*/),
        "city.upcomingShows.edges.node.coverImage.title": (v19/*: any*/),
        "city.upcomingShows.edges.node.coverImage.large": (v26/*: any*/),
        "city.upcomingShows.edges.node.coverImage.small": (v26/*: any*/),
        "city.currentShows.edges.node.startAt": (v19/*: any*/),
        "city.currentShows.edges.node.endAt": (v19/*: any*/),
        "city.currentShows.edges.node.formattedStartAt": (v19/*: any*/),
        "city.currentShows.edges.node.formattedEndAt": (v19/*: any*/),
        "city.currentShows.edges.node.location": (v25/*: any*/),
        "city.currentShows.edges.node.coverImage.title": (v19/*: any*/),
        "city.currentShows.edges.node.coverImage.large": (v26/*: any*/),
        "city.currentShows.edges.node.coverImage.small": (v26/*: any*/),
        "city.pastShows.edges.node.startAt": (v19/*: any*/),
        "city.pastShows.edges.node.endAt": (v19/*: any*/),
        "city.pastShows.edges.node.formattedStartAt": (v19/*: any*/),
        "city.pastShows.edges.node.formattedEndAt": (v19/*: any*/),
        "city.pastShows.edges.node.location": (v25/*: any*/),
        "city.pastShows.edges.node.coverImage.title": (v19/*: any*/),
        "city.pastShows.edges.node.coverImage.large": (v26/*: any*/),
        "city.pastShows.edges.node.coverImage.small": (v26/*: any*/),
        "city.upcomingShows.edges.node.location.city": (v19/*: any*/),
        "city.upcomingShows.edges.node.location.id": (v27/*: any*/),
        "city.upcomingShows.edges.node.coverImage.large.width": (v24/*: any*/),
        "city.upcomingShows.edges.node.coverImage.large.height": (v24/*: any*/),
        "city.upcomingShows.edges.node.coverImage.large.src": (v13/*: any*/),
        "city.upcomingShows.edges.node.coverImage.large.srcSet": (v13/*: any*/),
        "city.upcomingShows.edges.node.coverImage.small.width": (v24/*: any*/),
        "city.upcomingShows.edges.node.coverImage.small.height": (v24/*: any*/),
        "city.upcomingShows.edges.node.coverImage.small.src": (v13/*: any*/),
        "city.upcomingShows.edges.node.coverImage.small.srcSet": (v13/*: any*/),
        "city.upcomingShows.edges.node.partner.name": (v19/*: any*/),
        "city.upcomingShows.edges.node.partner.id": (v27/*: any*/),
        "city.currentShows.edges.node.location.city": (v19/*: any*/),
        "city.currentShows.edges.node.location.id": (v27/*: any*/),
        "city.currentShows.edges.node.coverImage.large.width": (v24/*: any*/),
        "city.currentShows.edges.node.coverImage.large.height": (v24/*: any*/),
        "city.currentShows.edges.node.coverImage.large.src": (v13/*: any*/),
        "city.currentShows.edges.node.coverImage.large.srcSet": (v13/*: any*/),
        "city.currentShows.edges.node.coverImage.small.width": (v24/*: any*/),
        "city.currentShows.edges.node.coverImage.small.height": (v24/*: any*/),
        "city.currentShows.edges.node.coverImage.small.src": (v13/*: any*/),
        "city.currentShows.edges.node.coverImage.small.srcSet": (v13/*: any*/),
        "city.currentShows.edges.node.partner.name": (v19/*: any*/),
        "city.currentShows.edges.node.partner.id": (v27/*: any*/),
        "city.pastShows.edges.node.location.city": (v19/*: any*/),
        "city.pastShows.edges.node.location.id": (v27/*: any*/),
        "city.pastShows.edges.node.coverImage.large.width": (v24/*: any*/),
        "city.pastShows.edges.node.coverImage.large.height": (v24/*: any*/),
        "city.pastShows.edges.node.coverImage.large.src": (v13/*: any*/),
        "city.pastShows.edges.node.coverImage.large.srcSet": (v13/*: any*/),
        "city.pastShows.edges.node.coverImage.small.width": (v24/*: any*/),
        "city.pastShows.edges.node.coverImage.small.height": (v24/*: any*/),
        "city.pastShows.edges.node.coverImage.small.src": (v13/*: any*/),
        "city.pastShows.edges.node.coverImage.small.srcSet": (v13/*: any*/),
        "city.pastShows.edges.node.partner.name": (v19/*: any*/),
        "city.pastShows.edges.node.partner.id": (v27/*: any*/)
      }
    },
    "name": "ShowsCity_Test_Query",
    "operationKind": "query",
    "text": "query ShowsCity_Test_Query {\n  viewer {\n    ...ShowsCity_viewer\n  }\n  city(slug: \"example\") {\n    ...ShowsCity_city\n  }\n}\n\nfragment Pagination_pageCursors on PageCursors {\n  around {\n    cursor\n    page\n    isCurrent\n  }\n  first {\n    cursor\n    page\n    isCurrent\n  }\n  last {\n    cursor\n    page\n    isCurrent\n  }\n  previous {\n    cursor\n    page\n  }\n}\n\nfragment ShowsCity_city on City {\n  name\n  slug\n  upcomingShows: showsConnection(first: 18, status: UPCOMING, sort: START_AT_ASC) {\n    edges {\n      node {\n        internalID\n        startAt\n        ...ShowsFeaturedShow_show\n        id\n      }\n    }\n  }\n  currentShows: showsConnection(first: 18, status: RUNNING, sort: END_AT_ASC) {\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n    pageCursors {\n      ...Pagination_pageCursors\n    }\n    totalCount\n    edges {\n      node {\n        internalID\n        ...ShowsFeaturedShow_show\n        id\n      }\n    }\n  }\n  pastShows: showsConnection(first: 18, status: CLOSED) {\n    edges {\n      node {\n        internalID\n        ...ShowsFeaturedShow_show\n        id\n      }\n    }\n  }\n}\n\nfragment ShowsCity_viewer on Viewer {\n  ...ShowsHeader_viewer\n}\n\nfragment ShowsFeaturedShow_show on Show {\n  ...ShowsShowDates_show\n  id\n  name\n  href\n  coverImage {\n    title\n    large: cropped(width: 910, height: 683) {\n      width\n      height\n      src\n      srcSet\n    }\n    small: cropped(width: 600, height: 450) {\n      width\n      height\n      src\n      srcSet\n    }\n  }\n  partner {\n    __typename\n    ... on Partner {\n      name\n    }\n    ... on ExternalPartner {\n      name\n      id\n    }\n    ... on Node {\n      id\n    }\n  }\n}\n\nfragment ShowsHeader_viewer on Viewer {\n  allCities: cities {\n    text: name\n    value: slug\n  }\n  featuredCities: cities(featured: true) {\n    text: name\n    value: slug\n  }\n}\n\nfragment ShowsShowDates_show on Show {\n  startAt\n  endAt\n  formattedStartAt: startAt(format: \"MMM D\")\n  formattedEndAt: endAt(format: \"MMM D\")\n  location {\n    city\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '1c1a75e5bd3a9b9f2c59c2432602eb96';
export default node;
