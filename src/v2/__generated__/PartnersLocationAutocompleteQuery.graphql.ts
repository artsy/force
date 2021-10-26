/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PartnersLocationAutocompleteQueryVariables = {};
export type PartnersLocationAutocompleteQueryResponse = {
    readonly viewer: {
        readonly " $fragmentRefs": FragmentRefs<"PartnersLocationAutocomplete_viewer">;
    } | null;
};
export type PartnersLocationAutocompleteQuery = {
    readonly response: PartnersLocationAutocompleteQueryResponse;
    readonly variables: PartnersLocationAutocompleteQueryVariables;
};



/*
query PartnersLocationAutocompleteQuery {
  viewer {
    ...PartnersLocationAutocomplete_viewer
  }
}

fragment PartnersLocationAutocomplete_viewer on Viewer {
  cities(featured: true) {
    text: name
    value: slug
    coordinates {
      lat
      lng
    }
  }
}
*/

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "PartnersLocationAutocompleteQuery",
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
            "name": "PartnersLocationAutocomplete_viewer"
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
    "name": "PartnersLocationAutocompleteQuery",
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
            "alias": null,
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
            "selections": [
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
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "LatLng",
                "kind": "LinkedField",
                "name": "coordinates",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "lat",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "lng",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "cities(featured:true)"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "PartnersLocationAutocompleteQuery",
    "operationKind": "query",
    "text": "query PartnersLocationAutocompleteQuery {\n  viewer {\n    ...PartnersLocationAutocomplete_viewer\n  }\n}\n\nfragment PartnersLocationAutocomplete_viewer on Viewer {\n  cities(featured: true) {\n    text: name\n    value: slug\n    coordinates {\n      lat\n      lng\n    }\n  }\n}\n"
  }
};
(node as any).hash = '1d8669d65db802a6ebce1789c1735b2f';
export default node;
