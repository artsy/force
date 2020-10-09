/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ShowApp_Test_QueryVariables = {};
export type ShowApp_Test_QueryResponse = {
    readonly show: {
        readonly " $fragmentRefs": FragmentRefs<"ShowApp_show">;
    } | null;
};
export type ShowApp_Test_Query = {
    readonly response: ShowApp_Test_QueryResponse;
    readonly variables: ShowApp_Test_QueryVariables;
};



/*
query ShowApp_Test_Query {
  show(id: "xxx") {
    ...ShowApp_show
    id
  }
}

fragment ShowAbout_show on Show {
  about: description
  pressRelease
  href
}

fragment ShowApp_show on Show {
  name
  about: description
  pressRelease
  ...ShowContextualLink_show
  ...ShowHeader_show
  ...ShowAbout_show
  ...ShowMeta_show
  ...ShowInstallShots_show
}

fragment ShowContextualLink_show on Show {
  isFairBooth
  fair {
    href
    name
    id
  }
  partner {
    __typename
    ... on Partner {
      isLinkable
      name
      href
    }
    ... on Node {
      id
    }
    ... on ExternalPartner {
      id
    }
  }
}

fragment ShowHeader_show on Show {
  name
  startAt
  endAt
  formattedStartAt: startAt(format: "MMMM D")
  formattedEndAt: endAt(format: "MMMM D, YYYY")
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

fragment ShowInstallShots_show on Show {
  name
  images {
    internalID
    mobile1x: resized(height: 300) {
      width
      height
    }
    _1x: resized(height: 400) {
      src: url
      width
      height
    }
    _2x: resized(height: 400) {
      src: url
    }
    zoom1x: resized(width: 900, height: 900) {
      src: url
      width
      height
    }
    zoom2x: resized(width: 1800, height: 1800) {
      src: url
    }
  }
}

fragment ShowMeta_show on Show {
  name
  slug
  metaDescription: description
  metaImage {
    src: url(version: "large")
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
  "name": "name",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
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
v6 = [
  {
    "kind": "Literal",
    "name": "height",
    "value": 400
  }
],
v7 = {
  "alias": "src",
  "args": null,
  "kind": "ScalarField",
  "name": "url",
  "storageKey": null
},
v8 = [
  (v7/*: any*/),
  (v4/*: any*/),
  (v5/*: any*/)
],
v9 = [
  (v7/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ShowApp_Test_Query",
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
            "name": "ShowApp_show"
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
    "name": "ShowApp_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Show",
        "kind": "LinkedField",
        "name": "show",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          {
            "alias": "about",
            "args": null,
            "kind": "ScalarField",
            "name": "description",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "pressRelease",
            "storageKey": null
          },
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
            "concreteType": "Fair",
            "kind": "LinkedField",
            "name": "fair",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v1/*: any*/),
              (v3/*: any*/)
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
              (v3/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "isLinkable",
                    "storageKey": null
                  },
                  (v1/*: any*/),
                  (v2/*: any*/)
                ],
                "type": "Partner"
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  (v1/*: any*/)
                ],
                "type": "ExternalPartner"
              }
            ],
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
                "value": "MMMM D"
              }
            ],
            "kind": "ScalarField",
            "name": "startAt",
            "storageKey": "startAt(format:\"MMMM D\")"
          },
          {
            "alias": "formattedEndAt",
            "args": [
              {
                "kind": "Literal",
                "name": "format",
                "value": "MMMM D, YYYY"
              }
            ],
            "kind": "ScalarField",
            "name": "endAt",
            "storageKey": "endAt(format:\"MMMM D, YYYY\")"
          },
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "slug",
            "storageKey": null
          },
          {
            "alias": "metaDescription",
            "args": null,
            "kind": "ScalarField",
            "name": "description",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Image",
            "kind": "LinkedField",
            "name": "metaImage",
            "plural": false,
            "selections": [
              {
                "alias": "src",
                "args": [
                  {
                    "kind": "Literal",
                    "name": "version",
                    "value": "large"
                  }
                ],
                "kind": "ScalarField",
                "name": "url",
                "storageKey": "url(version:\"large\")"
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Image",
            "kind": "LinkedField",
            "name": "images",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "internalID",
                "storageKey": null
              },
              {
                "alias": "mobile1x",
                "args": [
                  {
                    "kind": "Literal",
                    "name": "height",
                    "value": 300
                  }
                ],
                "concreteType": "ResizedImageUrl",
                "kind": "LinkedField",
                "name": "resized",
                "plural": false,
                "selections": [
                  (v4/*: any*/),
                  (v5/*: any*/)
                ],
                "storageKey": "resized(height:300)"
              },
              {
                "alias": "_1x",
                "args": (v6/*: any*/),
                "concreteType": "ResizedImageUrl",
                "kind": "LinkedField",
                "name": "resized",
                "plural": false,
                "selections": (v8/*: any*/),
                "storageKey": "resized(height:400)"
              },
              {
                "alias": "_2x",
                "args": (v6/*: any*/),
                "concreteType": "ResizedImageUrl",
                "kind": "LinkedField",
                "name": "resized",
                "plural": false,
                "selections": (v9/*: any*/),
                "storageKey": "resized(height:400)"
              },
              {
                "alias": "zoom1x",
                "args": [
                  {
                    "kind": "Literal",
                    "name": "height",
                    "value": 900
                  },
                  {
                    "kind": "Literal",
                    "name": "width",
                    "value": 900
                  }
                ],
                "concreteType": "ResizedImageUrl",
                "kind": "LinkedField",
                "name": "resized",
                "plural": false,
                "selections": (v8/*: any*/),
                "storageKey": "resized(height:900,width:900)"
              },
              {
                "alias": "zoom2x",
                "args": [
                  {
                    "kind": "Literal",
                    "name": "height",
                    "value": 1800
                  },
                  {
                    "kind": "Literal",
                    "name": "width",
                    "value": 1800
                  }
                ],
                "concreteType": "ResizedImageUrl",
                "kind": "LinkedField",
                "name": "resized",
                "plural": false,
                "selections": (v9/*: any*/),
                "storageKey": "resized(height:1800,width:1800)"
              }
            ],
            "storageKey": null
          },
          (v3/*: any*/)
        ],
        "storageKey": "show(id:\"xxx\")"
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "ShowApp_Test_Query",
    "operationKind": "query",
    "text": "query ShowApp_Test_Query {\n  show(id: \"xxx\") {\n    ...ShowApp_show\n    id\n  }\n}\n\nfragment ShowAbout_show on Show {\n  about: description\n  pressRelease\n  href\n}\n\nfragment ShowApp_show on Show {\n  name\n  about: description\n  pressRelease\n  ...ShowContextualLink_show\n  ...ShowHeader_show\n  ...ShowAbout_show\n  ...ShowMeta_show\n  ...ShowInstallShots_show\n}\n\nfragment ShowContextualLink_show on Show {\n  isFairBooth\n  fair {\n    href\n    name\n    id\n  }\n  partner {\n    __typename\n    ... on Partner {\n      isLinkable\n      name\n      href\n    }\n    ... on Node {\n      id\n    }\n    ... on ExternalPartner {\n      id\n    }\n  }\n}\n\nfragment ShowHeader_show on Show {\n  name\n  startAt\n  endAt\n  formattedStartAt: startAt(format: \"MMMM D\")\n  formattedEndAt: endAt(format: \"MMMM D, YYYY\")\n  partner {\n    __typename\n    ... on Partner {\n      name\n    }\n    ... on ExternalPartner {\n      name\n      id\n    }\n    ... on Node {\n      id\n    }\n  }\n}\n\nfragment ShowInstallShots_show on Show {\n  name\n  images {\n    internalID\n    mobile1x: resized(height: 300) {\n      width\n      height\n    }\n    _1x: resized(height: 400) {\n      src: url\n      width\n      height\n    }\n    _2x: resized(height: 400) {\n      src: url\n    }\n    zoom1x: resized(width: 900, height: 900) {\n      src: url\n      width\n      height\n    }\n    zoom2x: resized(width: 1800, height: 1800) {\n      src: url\n    }\n  }\n}\n\nfragment ShowMeta_show on Show {\n  name\n  slug\n  metaDescription: description\n  metaImage {\n    src: url(version: \"large\")\n  }\n}\n"
  }
};
})();
(node as any).hash = '7fa78ef8909514aa70ba8bfff4a97dcd';
export default node;
