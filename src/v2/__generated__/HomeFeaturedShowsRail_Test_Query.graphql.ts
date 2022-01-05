/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type HomeFeaturedShowsRail_Test_QueryVariables = {};
export type HomeFeaturedShowsRail_Test_QueryResponse = {
    readonly orderedSet: {
        readonly " $fragmentRefs": FragmentRefs<"HomeFeaturedShowsRail_orderedSet">;
    } | null;
};
export type HomeFeaturedShowsRail_Test_Query = {
    readonly response: HomeFeaturedShowsRail_Test_QueryResponse;
    readonly variables: HomeFeaturedShowsRail_Test_QueryVariables;
};



/*
query HomeFeaturedShowsRail_Test_Query {
  orderedSet(id: "example") {
    ...HomeFeaturedShowsRail_orderedSet
    id
  }
}

fragment HomeFeaturedShow_show on Show {
  internalID
  slug
  name
  href
  startAt
  endAt
  formattedStartAt: startAt(format: "MMM D")
  formattedEndAt: endAt(format: "MMM D")
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
  coverImage {
    cropped(width: 325, height: 230) {
      src
      srcSet
      width
      height
    }
  }
}

fragment HomeFeaturedShowsRail_orderedSet on OrderedSet {
  items {
    __typename
    ... on Show {
      internalID
      ...HomeFeaturedShow_show
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
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "example"
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
  "name": "name",
  "storageKey": null
},
v4 = [
  {
    "kind": "Literal",
    "name": "format",
    "value": "MMM D"
  }
],
v5 = [
  (v3/*: any*/)
],
v6 = {
  "type": "ID",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v7 = {
  "type": "String",
  "enumValues": null,
  "plural": false,
  "nullable": false
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
    "name": "HomeFeaturedShowsRail_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "OrderedSet",
        "kind": "LinkedField",
        "name": "orderedSet",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "HomeFeaturedShowsRail_orderedSet"
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
    "name": "HomeFeaturedShowsRail_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
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
              (v1/*: any*/),
              (v2/*: any*/),
              {
                "kind": "InlineFragment",
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
                    "name": "slug",
                    "storageKey": null
                  },
                  (v3/*: any*/),
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
                    "concreteType": null,
                    "kind": "LinkedField",
                    "name": "partner",
                    "plural": false,
                    "selections": [
                      (v1/*: any*/),
                      (v2/*: any*/),
                      {
                        "kind": "InlineFragment",
                        "selections": (v5/*: any*/),
                        "type": "Partner"
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": (v5/*: any*/),
                        "type": "ExternalPartner"
                      }
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
                            "value": 230
                          },
                          {
                            "kind": "Literal",
                            "name": "width",
                            "value": 325
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
                        "storageKey": "cropped(height:230,width:325)"
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
          (v2/*: any*/)
        ],
        "storageKey": "orderedSet(id:\"example\")"
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "orderedSet": {
          "type": "OrderedSet",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "orderedSet.id": (v6/*: any*/),
        "orderedSet.items": {
          "type": "OrderedSetItem",
          "enumValues": null,
          "plural": true,
          "nullable": true
        },
        "orderedSet.items.__typename": (v7/*: any*/),
        "orderedSet.items.internalID": (v8/*: any*/),
        "orderedSet.items.id": (v6/*: any*/),
        "orderedSet.items.slug": (v8/*: any*/),
        "orderedSet.items.name": (v9/*: any*/),
        "orderedSet.items.href": (v9/*: any*/),
        "orderedSet.items.startAt": (v9/*: any*/),
        "orderedSet.items.endAt": (v9/*: any*/),
        "orderedSet.items.formattedStartAt": (v9/*: any*/),
        "orderedSet.items.formattedEndAt": (v9/*: any*/),
        "orderedSet.items.partner": {
          "type": "PartnerTypes",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "orderedSet.items.coverImage": {
          "type": "Image",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "orderedSet.items.coverImage.cropped": {
          "type": "CroppedImageUrl",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "orderedSet.items.partner.name": (v9/*: any*/),
        "orderedSet.items.partner.id": (v6/*: any*/),
        "orderedSet.items.coverImage.cropped.src": (v7/*: any*/),
        "orderedSet.items.coverImage.cropped.srcSet": (v7/*: any*/),
        "orderedSet.items.coverImage.cropped.width": (v10/*: any*/),
        "orderedSet.items.coverImage.cropped.height": (v10/*: any*/)
      }
    },
    "name": "HomeFeaturedShowsRail_Test_Query",
    "operationKind": "query",
    "text": "query HomeFeaturedShowsRail_Test_Query {\n  orderedSet(id: \"example\") {\n    ...HomeFeaturedShowsRail_orderedSet\n    id\n  }\n}\n\nfragment HomeFeaturedShow_show on Show {\n  internalID\n  slug\n  name\n  href\n  startAt\n  endAt\n  formattedStartAt: startAt(format: \"MMM D\")\n  formattedEndAt: endAt(format: \"MMM D\")\n  partner {\n    __typename\n    ... on Partner {\n      name\n    }\n    ... on ExternalPartner {\n      name\n      id\n    }\n    ... on Node {\n      id\n    }\n  }\n  coverImage {\n    cropped(width: 325, height: 230) {\n      src\n      srcSet\n      width\n      height\n    }\n  }\n}\n\nfragment HomeFeaturedShowsRail_orderedSet on OrderedSet {\n  items {\n    __typename\n    ... on Show {\n      internalID\n      ...HomeFeaturedShow_show\n    }\n    ... on Node {\n      id\n    }\n    ... on FeaturedLink {\n      id\n    }\n    ... on Profile {\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '4bf647cb7acfa53ac3204fd28dbe4199';
export default node;
