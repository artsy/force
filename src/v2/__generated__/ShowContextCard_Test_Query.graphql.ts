/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ShowContextCard_Test_QueryVariables = {};
export type ShowContextCard_Test_QueryResponse = {
    readonly show: {
        readonly " $fragmentRefs": FragmentRefs<"ShowContextCard_show">;
    } | null;
};
export type ShowContextCard_Test_Query = {
    readonly response: ShowContextCard_Test_QueryResponse;
    readonly variables: ShowContextCard_Test_QueryVariables;
};



/*
query ShowContextCard_Test_Query {
  show(id: "xxx") {
    ...ShowContextCard_show
    id
  }
}

fragment FairCard_fair on Fair {
  name
  image {
    cropped(width: 768, height: 512, version: "wide") {
      src
      srcSet
    }
  }
}

fragment FairTiming_fair on Fair {
  exhibitionPeriod
  startAt
  endAt
}

fragment ShowContextCard_show on Show {
  isFairBooth
  partner {
    __typename
    ... on Partner {
      internalID
      slug
      href
      name
      locations {
        city
        id
      }
      artworksConnection(first: 3, sort: MERCHANDISABILITY_DESC) {
        edges {
          node {
            image {
              url(version: "larger")
            }
            id
          }
        }
      }
    }
    ... on Node {
      id
    }
    ... on ExternalPartner {
      id
    }
  }
  fair {
    internalID
    isActive
    slug
    href
    name
    ...FairTiming_fair
    ...FairCard_fair
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "xxx"
  }
],
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
  "name": "slug",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v6 = {
  "type": "ID",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v7 = {
  "type": "Boolean",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v8 = {
  "type": "ID",
  "enumValues": null,
  "plural": false,
  "nullable": false
},
v9 = {
  "type": "String",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v10 = {
  "type": "Image",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v11 = {
  "type": "String",
  "enumValues": null,
  "plural": false,
  "nullable": false
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ShowContextCard_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Show",
        "kind": "LinkedField",
        "name": "show",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ShowContextCard_show"
          }
        ],
        "storageKey": "show(id:\"xxx\")"
      }
    ],
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ShowContextCard_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Show",
        "kind": "LinkedField",
        "name": "show",
        "plural": false,
        "selections": [
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
              (v1/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": [
                  (v2/*: any*/),
                  (v3/*: any*/),
                  (v4/*: any*/),
                  (v5/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Location",
                    "kind": "LinkedField",
                    "name": "locations",
                    "plural": true,
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
                    "args": [
                      {
                        "kind": "Literal",
                        "name": "first",
                        "value": 3
                      },
                      {
                        "kind": "Literal",
                        "name": "sort",
                        "value": "MERCHANDISABILITY_DESC"
                      }
                    ],
                    "concreteType": "ArtworkConnection",
                    "kind": "LinkedField",
                    "name": "artworksConnection",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "ArtworkEdge",
                        "kind": "LinkedField",
                        "name": "edges",
                        "plural": true,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Artwork",
                            "kind": "LinkedField",
                            "name": "node",
                            "plural": false,
                            "selections": [
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
                                        "name": "version",
                                        "value": "larger"
                                      }
                                    ],
                                    "kind": "ScalarField",
                                    "name": "url",
                                    "storageKey": "url(version:\"larger\")"
                                  }
                                ],
                                "storageKey": null
                              },
                              (v1/*: any*/)
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": "artworksConnection(first:3,sort:\"MERCHANDISABILITY_DESC\")"
                  }
                ],
                "type": "Partner"
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Fair",
            "kind": "LinkedField",
            "name": "fair",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isActive",
                "storageKey": null
              },
              (v3/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
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
                        "value": "wide"
                      },
                      {
                        "kind": "Literal",
                        "name": "width",
                        "value": 768
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
                    "storageKey": "cropped(height:512,version:\"wide\",width:768)"
                  }
                ],
                "storageKey": null
              },
              (v1/*: any*/)
            ],
            "storageKey": null
          },
          (v1/*: any*/)
        ],
        "storageKey": "show(id:\"xxx\")"
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "show": {
          "type": "Show",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "show.id": (v6/*: any*/),
        "show.isFairBooth": (v7/*: any*/),
        "show.partner": {
          "type": "PartnerTypes",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "show.fair": {
          "type": "Fair",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "show.fair.internalID": (v8/*: any*/),
        "show.fair.isActive": (v7/*: any*/),
        "show.fair.slug": (v8/*: any*/),
        "show.fair.href": (v9/*: any*/),
        "show.fair.name": (v9/*: any*/),
        "show.fair.id": (v6/*: any*/),
        "show.partner.internalID": (v8/*: any*/),
        "show.partner.slug": (v8/*: any*/),
        "show.partner.href": (v9/*: any*/),
        "show.partner.name": (v9/*: any*/),
        "show.partner.locations": {
          "type": "Location",
          "enumValues": null,
          "plural": true,
          "nullable": true
        },
        "show.partner.artworksConnection": {
          "type": "ArtworkConnection",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "show.partner.id": (v6/*: any*/),
        "show.fair.exhibitionPeriod": (v9/*: any*/),
        "show.fair.startAt": (v9/*: any*/),
        "show.fair.endAt": (v9/*: any*/),
        "show.fair.image": (v10/*: any*/),
        "show.partner.locations.city": (v9/*: any*/),
        "show.partner.locations.id": (v6/*: any*/),
        "show.partner.artworksConnection.edges": {
          "type": "ArtworkEdge",
          "enumValues": null,
          "plural": true,
          "nullable": true
        },
        "show.fair.image.cropped": {
          "type": "CroppedImageUrl",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "show.partner.artworksConnection.edges.node": {
          "type": "Artwork",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "show.fair.image.cropped.src": (v11/*: any*/),
        "show.fair.image.cropped.srcSet": (v11/*: any*/),
        "show.partner.artworksConnection.edges.node.image": (v10/*: any*/),
        "show.partner.artworksConnection.edges.node.id": (v6/*: any*/),
        "show.partner.artworksConnection.edges.node.image.url": (v9/*: any*/)
      }
    },
    "name": "ShowContextCard_Test_Query",
    "operationKind": "query",
    "text": "query ShowContextCard_Test_Query {\n  show(id: \"xxx\") {\n    ...ShowContextCard_show\n    id\n  }\n}\n\nfragment FairCard_fair on Fair {\n  name\n  image {\n    cropped(width: 768, height: 512, version: \"wide\") {\n      src\n      srcSet\n    }\n  }\n}\n\nfragment FairTiming_fair on Fair {\n  exhibitionPeriod\n  startAt\n  endAt\n}\n\nfragment ShowContextCard_show on Show {\n  isFairBooth\n  partner {\n    __typename\n    ... on Partner {\n      internalID\n      slug\n      href\n      name\n      locations {\n        city\n        id\n      }\n      artworksConnection(first: 3, sort: MERCHANDISABILITY_DESC) {\n        edges {\n          node {\n            image {\n              url(version: \"larger\")\n            }\n            id\n          }\n        }\n      }\n    }\n    ... on Node {\n      id\n    }\n    ... on ExternalPartner {\n      id\n    }\n  }\n  fair {\n    internalID\n    isActive\n    slug\n    href\n    name\n    ...FairTiming_fair\n    ...FairCard_fair\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = 'a076faf502dc6859a703cbcc91bddf4f';
export default node;
