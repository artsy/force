/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ShowMeta_Test_QueryVariables = {};
export type ShowMeta_Test_QueryResponse = {
    readonly show: {
        readonly " $fragmentRefs": FragmentRefs<"ShowMeta_show">;
    } | null;
};
export type ShowMeta_Test_Query = {
    readonly response: ShowMeta_Test_QueryResponse;
    readonly variables: ShowMeta_Test_QueryVariables;
};



/*
query ShowMeta_Test_Query {
  show(id: "some-show") {
    ...ShowMeta_show
    id
  }
}

fragment ShowMeta_show on Show {
  name
  slug
  metaDescription: description
  metaImage {
    src: url(version: "large")
  }
  partner {
    __typename
    ... on Partner {
      name
    }
    ... on Node {
      id
    }
    ... on ExternalPartner {
      id
    }
  }
  formattedStartAt: startAt(format: "MMMM D")
  formattedEndAt: endAt(format: "MMMM D, YYYY")
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "some-show"
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
  "name": "id",
  "storageKey": null
},
v3 = {
  "type": "ID",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v4 = {
  "type": "String",
  "enumValues": null,
  "plural": false,
  "nullable": true
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ShowMeta_Test_Query",
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
            "name": "ShowMeta_show"
          }
        ],
        "storageKey": "show(id:\"some-show\")"
      }
    ],
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ShowMeta_Test_Query",
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
              (v2/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": [
                  (v1/*: any*/)
                ],
                "type": "Partner"
              }
            ],
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
          (v2/*: any*/)
        ],
        "storageKey": "show(id:\"some-show\")"
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
        "show.id": (v3/*: any*/),
        "show.name": (v4/*: any*/),
        "show.slug": {
          "type": "ID",
          "enumValues": null,
          "plural": false,
          "nullable": false
        },
        "show.metaDescription": (v4/*: any*/),
        "show.metaImage": {
          "type": "Image",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "show.partner": {
          "type": "PartnerTypes",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "show.formattedStartAt": (v4/*: any*/),
        "show.formattedEndAt": (v4/*: any*/),
        "show.metaImage.src": (v4/*: any*/),
        "show.partner.name": (v4/*: any*/),
        "show.partner.id": (v3/*: any*/)
      }
    },
    "name": "ShowMeta_Test_Query",
    "operationKind": "query",
    "text": "query ShowMeta_Test_Query {\n  show(id: \"some-show\") {\n    ...ShowMeta_show\n    id\n  }\n}\n\nfragment ShowMeta_show on Show {\n  name\n  slug\n  metaDescription: description\n  metaImage {\n    src: url(version: \"large\")\n  }\n  partner {\n    __typename\n    ... on Partner {\n      name\n    }\n    ... on Node {\n      id\n    }\n    ... on ExternalPartner {\n      id\n    }\n  }\n  formattedStartAt: startAt(format: \"MMMM D\")\n  formattedEndAt: endAt(format: \"MMMM D, YYYY\")\n}\n"
  }
};
})();
(node as any).hash = '072a19223d51defe130b86944ef7f954';
export default node;
