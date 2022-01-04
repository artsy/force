/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ShowsIndex_Test_QueryVariables = {};
export type ShowsIndex_Test_QueryResponse = {
    readonly viewer: {
        readonly " $fragmentRefs": FragmentRefs<"ShowsIndex_viewer">;
    } | null;
    readonly featuredShows: {
        readonly " $fragmentRefs": FragmentRefs<"ShowsIndex_featuredShows">;
    } | null;
};
export type ShowsIndex_Test_Query = {
    readonly response: ShowsIndex_Test_QueryResponse;
    readonly variables: ShowsIndex_Test_QueryVariables;
};



/*
query ShowsIndex_Test_Query {
  viewer {
    ...ShowsIndex_viewer
  }
  featuredShows: orderedSet(id: "example") {
    ...ShowsIndex_featuredShows
    id
  }
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

fragment ShowsIndex_featuredShows on OrderedSet {
  name
  items {
    __typename
    ... on Show {
      id
      ...ShowsFeaturedShow_show
    }
    ... on Node {
      id
    }
    ... on FeaturedLink {
      id
    }
    ... on Profile {
      id
    }
  }
}

fragment ShowsIndex_viewer on Viewer {
  ...ShowsHeader_viewer
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
    "name": "id",
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
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
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
    "kind": "Literal",
    "name": "format",
    "value": "MMM D"
  }
],
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
  "type": "ID",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v9 = {
  "type": "String",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v10 = {
  "type": "City",
  "enumValues": null,
  "plural": true,
  "nullable": false
},
v11 = {
  "type": "String",
  "enumValues": null,
  "plural": false,
  "nullable": false
},
v12 = {
  "type": "CroppedImageUrl",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v13 = {
  "type": "Int",
  "enumValues": null,
  "plural": false,
  "nullable": false
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ShowsIndex_Test_Query",
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
            "name": "ShowsIndex_viewer"
          }
        ],
        "storageKey": null
      },
      {
        "alias": "featuredShows",
        "args": (v0/*: any*/),
        "concreteType": "OrderedSet",
        "kind": "LinkedField",
        "name": "orderedSet",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ShowsIndex_featuredShows"
          }
        ],
        "storageKey": "orderedSet(id:\"example\")"
      }
    ],
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ShowsIndex_Test_Query",
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
        "alias": "featuredShows",
        "args": (v0/*: any*/),
        "concreteType": "OrderedSet",
        "kind": "LinkedField",
        "name": "orderedSet",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "items",
            "plural": true,
            "selections": [
              (v3/*: any*/),
              (v4/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": [
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
                    "args": (v5/*: any*/),
                    "kind": "ScalarField",
                    "name": "startAt",
                    "storageKey": "startAt(format:\"MMM D\")"
                  },
                  {
                    "alias": "formattedEndAt",
                    "args": (v5/*: any*/),
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
                      (v4/*: any*/)
                    ],
                    "storageKey": null
                  },
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
                      (v3/*: any*/),
                      (v4/*: any*/),
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
                "type": "Show"
              }
            ],
            "storageKey": null
          },
          (v4/*: any*/)
        ],
        "storageKey": "orderedSet(id:\"example\")"
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
        "featuredShows": {
          "type": "OrderedSet",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "featuredShows.id": (v8/*: any*/),
        "featuredShows.name": (v9/*: any*/),
        "featuredShows.items": {
          "type": "OrderedSetItem",
          "enumValues": null,
          "plural": true,
          "nullable": true
        },
        "viewer.allCities": (v10/*: any*/),
        "viewer.featuredCities": (v10/*: any*/),
        "viewer.allCities.text": (v11/*: any*/),
        "viewer.allCities.value": (v11/*: any*/),
        "viewer.featuredCities.text": (v11/*: any*/),
        "viewer.featuredCities.value": (v11/*: any*/),
        "featuredShows.items.id": {
          "type": "ID",
          "enumValues": null,
          "plural": false,
          "nullable": false
        },
        "featuredShows.items.name": (v9/*: any*/),
        "featuredShows.items.href": (v9/*: any*/),
        "featuredShows.items.coverImage": {
          "type": "Image",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "featuredShows.items.partner": {
          "type": "PartnerTypes",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "featuredShows.items.startAt": (v9/*: any*/),
        "featuredShows.items.endAt": (v9/*: any*/),
        "featuredShows.items.formattedStartAt": (v9/*: any*/),
        "featuredShows.items.formattedEndAt": (v9/*: any*/),
        "featuredShows.items.location": {
          "type": "Location",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "featuredShows.items.coverImage.title": (v9/*: any*/),
        "featuredShows.items.coverImage.large": (v12/*: any*/),
        "featuredShows.items.coverImage.small": (v12/*: any*/),
        "featuredShows.items.location.city": (v9/*: any*/),
        "featuredShows.items.location.id": (v8/*: any*/),
        "featuredShows.items.coverImage.large.width": (v13/*: any*/),
        "featuredShows.items.coverImage.large.height": (v13/*: any*/),
        "featuredShows.items.coverImage.large.src": (v11/*: any*/),
        "featuredShows.items.coverImage.large.srcSet": (v11/*: any*/),
        "featuredShows.items.coverImage.small.width": (v13/*: any*/),
        "featuredShows.items.coverImage.small.height": (v13/*: any*/),
        "featuredShows.items.coverImage.small.src": (v11/*: any*/),
        "featuredShows.items.coverImage.small.srcSet": (v11/*: any*/),
        "featuredShows.items.partner.name": (v9/*: any*/),
        "featuredShows.items.partner.id": (v8/*: any*/)
      }
    },
    "name": "ShowsIndex_Test_Query",
    "operationKind": "query",
    "text": "query ShowsIndex_Test_Query {\n  viewer {\n    ...ShowsIndex_viewer\n  }\n  featuredShows: orderedSet(id: \"example\") {\n    ...ShowsIndex_featuredShows\n    id\n  }\n}\n\nfragment ShowsFeaturedShow_show on Show {\n  ...ShowsShowDates_show\n  id\n  name\n  href\n  coverImage {\n    title\n    large: cropped(width: 910, height: 683) {\n      width\n      height\n      src\n      srcSet\n    }\n    small: cropped(width: 600, height: 450) {\n      width\n      height\n      src\n      srcSet\n    }\n  }\n  partner {\n    __typename\n    ... on Partner {\n      name\n    }\n    ... on ExternalPartner {\n      name\n      id\n    }\n    ... on Node {\n      id\n    }\n  }\n}\n\nfragment ShowsHeader_viewer on Viewer {\n  allCities: cities {\n    text: name\n    value: slug\n  }\n  featuredCities: cities(featured: true) {\n    text: name\n    value: slug\n  }\n}\n\nfragment ShowsIndex_featuredShows on OrderedSet {\n  name\n  items {\n    __typename\n    ... on Show {\n      id\n      ...ShowsFeaturedShow_show\n    }\n    ... on Node {\n      id\n    }\n    ... on FeaturedLink {\n      id\n    }\n    ... on Profile {\n      id\n    }\n  }\n}\n\nfragment ShowsIndex_viewer on Viewer {\n  ...ShowsHeader_viewer\n}\n\nfragment ShowsShowDates_show on Show {\n  startAt\n  endAt\n  formattedStartAt: startAt(format: \"MMM D\")\n  formattedEndAt: endAt(format: \"MMM D\")\n  location {\n    city\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '78ce8874a54dc95631e0249533aaf1d1';
export default node;
