/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type HomeFeaturedShowsQueryVariables = {};
export type HomeFeaturedShowsQueryResponse = {
    readonly orderedSet: {
        readonly " $fragmentRefs": FragmentRefs<"HomeFeaturedShows_orderedSet">;
    } | null;
};
export type HomeFeaturedShowsQuery = {
    readonly response: HomeFeaturedShowsQueryResponse;
    readonly variables: HomeFeaturedShowsQueryVariables;
};



/*
query HomeFeaturedShowsQuery {
  orderedSet(id: "530ebe92139b21efd6000071") {
    ...HomeFeaturedShows_orderedSet
    id
  }
}

fragment HomeFeaturedShow_show on Show {
  name
  href
  startAt
  endAt
  formattedStartAt: startAt(format: "MMM D")
  formattedEndAt: endAt(format: "D")
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
    cropped(width: 600, height: 450) {
      src
      srcSet
    }
  }
}

fragment HomeFeaturedShows_orderedSet on OrderedSet {
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
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "530ebe92139b21efd6000071"
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
  (v3/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "HomeFeaturedShowsQuery",
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
            "name": "HomeFeaturedShows_orderedSet"
          }
        ],
        "storageKey": "orderedSet(id:\"530ebe92139b21efd6000071\")"
      }
    ],
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "HomeFeaturedShowsQuery",
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
                    "args": [
                      {
                        "kind": "Literal",
                        "name": "format",
                        "value": "MMM D"
                      }
                    ],
                    "kind": "ScalarField",
                    "name": "startAt",
                    "storageKey": "startAt(format:\"MMM D\")"
                  },
                  {
                    "alias": "formattedEndAt",
                    "args": [
                      {
                        "kind": "Literal",
                        "name": "format",
                        "value": "D"
                      }
                    ],
                    "kind": "ScalarField",
                    "name": "endAt",
                    "storageKey": "endAt(format:\"D\")"
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
                        "selections": (v4/*: any*/),
                        "type": "Partner"
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": (v4/*: any*/),
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
                        "storageKey": "cropped(height:450,width:600)"
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
        "storageKey": "orderedSet(id:\"530ebe92139b21efd6000071\")"
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "HomeFeaturedShowsQuery",
    "operationKind": "query",
    "text": "query HomeFeaturedShowsQuery {\n  orderedSet(id: \"530ebe92139b21efd6000071\") {\n    ...HomeFeaturedShows_orderedSet\n    id\n  }\n}\n\nfragment HomeFeaturedShow_show on Show {\n  name\n  href\n  startAt\n  endAt\n  formattedStartAt: startAt(format: \"MMM D\")\n  formattedEndAt: endAt(format: \"D\")\n  partner {\n    __typename\n    ... on Partner {\n      name\n    }\n    ... on ExternalPartner {\n      name\n      id\n    }\n    ... on Node {\n      id\n    }\n  }\n  coverImage {\n    cropped(width: 600, height: 450) {\n      src\n      srcSet\n    }\n  }\n}\n\nfragment HomeFeaturedShows_orderedSet on OrderedSet {\n  items {\n    __typename\n    ... on Show {\n      internalID\n      ...HomeFeaturedShow_show\n    }\n    ... on Node {\n      id\n    }\n    ... on FeaturedLink {\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'bfcc116150c94d9ed39102001f5bb95a';
export default node;
