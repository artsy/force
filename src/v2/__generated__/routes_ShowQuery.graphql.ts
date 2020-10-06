/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type routes_ShowQueryVariables = {
    slug: string;
};
export type routes_ShowQueryResponse = {
    readonly show: {
        readonly " $fragmentRefs": FragmentRefs<"ShowApp_show">;
    } | null;
};
export type routes_ShowQuery = {
    readonly response: routes_ShowQueryResponse;
    readonly variables: routes_ShowQueryVariables;
};



/*
query routes_ShowQuery(
  $slug: String!
) {
  show(id: $slug) {
    ...ShowApp_show
    id
  }
}

fragment ShowApp_show on Show {
  name
  ...ShowMeta_show
  ...ShowInstallShots_show
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
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "slug",
    "type": "String!"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "slug"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "width",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "height",
  "storageKey": null
},
v4 = [
  {
    "kind": "Literal",
    "name": "height",
    "value": 400
  }
],
v5 = {
  "alias": "src",
  "args": null,
  "kind": "ScalarField",
  "name": "url",
  "storageKey": null
},
v6 = [
  (v5/*: any*/),
  (v2/*: any*/),
  (v3/*: any*/)
],
v7 = [
  (v5/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "routes_ShowQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
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
        "storageKey": null
      }
    ],
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "routes_ShowQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Show",
        "kind": "LinkedField",
        "name": "show",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "name",
            "storageKey": null
          },
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
                  (v2/*: any*/),
                  (v3/*: any*/)
                ],
                "storageKey": "resized(height:300)"
              },
              {
                "alias": "_1x",
                "args": (v4/*: any*/),
                "concreteType": "ResizedImageUrl",
                "kind": "LinkedField",
                "name": "resized",
                "plural": false,
                "selections": (v6/*: any*/),
                "storageKey": "resized(height:400)"
              },
              {
                "alias": "_2x",
                "args": (v4/*: any*/),
                "concreteType": "ResizedImageUrl",
                "kind": "LinkedField",
                "name": "resized",
                "plural": false,
                "selections": (v7/*: any*/),
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
                "selections": (v6/*: any*/),
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
                "selections": (v7/*: any*/),
                "storageKey": "resized(height:1800,width:1800)"
              }
            ],
            "storageKey": null
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
    "id": null,
    "metadata": {},
    "name": "routes_ShowQuery",
    "operationKind": "query",
    "text": "query routes_ShowQuery(\n  $slug: String!\n) {\n  show(id: $slug) {\n    ...ShowApp_show\n    id\n  }\n}\n\nfragment ShowApp_show on Show {\n  name\n  ...ShowMeta_show\n  ...ShowInstallShots_show\n}\n\nfragment ShowInstallShots_show on Show {\n  name\n  images {\n    internalID\n    mobile1x: resized(height: 300) {\n      width\n      height\n    }\n    _1x: resized(height: 400) {\n      src: url\n      width\n      height\n    }\n    _2x: resized(height: 400) {\n      src: url\n    }\n    zoom1x: resized(width: 900, height: 900) {\n      src: url\n      width\n      height\n    }\n    zoom2x: resized(width: 1800, height: 1800) {\n      src: url\n    }\n  }\n}\n\nfragment ShowMeta_show on Show {\n  name\n  slug\n  metaDescription: description\n  metaImage {\n    src: url(version: \"large\")\n  }\n}\n"
  }
};
})();
(node as any).hash = 'b6a500c743304c6db9a3cbaa7109e21f';
export default node;
