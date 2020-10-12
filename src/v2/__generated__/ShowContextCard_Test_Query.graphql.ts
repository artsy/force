/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ShowContextCard_Test_QueryVariables = {
    slug: string;
};
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
query ShowContextCard_Test_Query(
  $slug: String!
) {
  show(id: $slug) {
    ...ShowContextCard_show
    id
  }
}

fragment FairCard_fair on Fair {
  name
  image {
    _1x: cropped(width: 768, height: 512, version: "wide") {
      src: url
    }
    _2x: cropped(width: 1536, height: 1024, version: "wide") {
      src: url
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
  fair {
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
  "kind": "Literal",
  "name": "version",
  "value": "wide"
},
v3 = [
  {
    "alias": "src",
    "args": null,
    "kind": "ScalarField",
    "name": "url",
    "storageKey": null
  }
],
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ShowContextCard_Test_Query",
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
            "name": "ShowContextCard_show"
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
    "name": "ShowContextCard_Test_Query",
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
                "name": "name",
                "storageKey": null
              },
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
                    "alias": "_1x",
                    "args": [
                      {
                        "kind": "Literal",
                        "name": "height",
                        "value": 512
                      },
                      (v2/*: any*/),
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
                    "selections": (v3/*: any*/),
                    "storageKey": "cropped(height:512,version:\"wide\",width:768)"
                  },
                  {
                    "alias": "_2x",
                    "args": [
                      {
                        "kind": "Literal",
                        "name": "height",
                        "value": 1024
                      },
                      (v2/*: any*/),
                      {
                        "kind": "Literal",
                        "name": "width",
                        "value": 1536
                      }
                    ],
                    "concreteType": "CroppedImageUrl",
                    "kind": "LinkedField",
                    "name": "cropped",
                    "plural": false,
                    "selections": (v3/*: any*/),
                    "storageKey": "cropped(height:1024,version:\"wide\",width:1536)"
                  }
                ],
                "storageKey": null
              },
              (v4/*: any*/)
            ],
            "storageKey": null
          },
          (v4/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "ShowContextCard_Test_Query",
    "operationKind": "query",
    "text": "query ShowContextCard_Test_Query(\n  $slug: String!\n) {\n  show(id: $slug) {\n    ...ShowContextCard_show\n    id\n  }\n}\n\nfragment FairCard_fair on Fair {\n  name\n  image {\n    _1x: cropped(width: 768, height: 512, version: \"wide\") {\n      src: url\n    }\n    _2x: cropped(width: 1536, height: 1024, version: \"wide\") {\n      src: url\n    }\n  }\n}\n\nfragment FairTiming_fair on Fair {\n  exhibitionPeriod\n  startAt\n  endAt\n}\n\nfragment ShowContextCard_show on Show {\n  isFairBooth\n  fair {\n    href\n    name\n    ...FairTiming_fair\n    ...FairCard_fair\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = 'a7359cd327930945e900c214fa9d3907';
export default node;
