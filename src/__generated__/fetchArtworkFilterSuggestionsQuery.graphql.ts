/**
 * @generated SignedSource<<9d5e09dc05856f793a8d96076ebad650>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type ArtworkSizes = "LARGE" | "MEDIUM" | "SMALL" | "%future added value";
export type fetchArtworkFilterSuggestionsQuery$variables = {
  query: string;
};
export type fetchArtworkFilterSuggestionsQuery$data = {
  readonly artworkFilterSuggestions: {
    readonly dropped: ReadonlyArray<{
      readonly field: string | null | undefined;
      readonly value: string | null | undefined;
    }>;
    readonly fellOpen: boolean | null | undefined;
    readonly filters: {
      readonly acquireable: boolean | null | undefined;
      readonly artistNationalities: ReadonlyArray<string | null | undefined> | null | undefined;
      readonly atAuction: boolean | null | undefined;
      readonly attributionClass: ReadonlyArray<string | null | undefined> | null | undefined;
      readonly colors: ReadonlyArray<string | null | undefined> | null | undefined;
      readonly forSale: boolean | null | undefined;
      readonly framed: boolean | null | undefined;
      readonly geneIDs: ReadonlyArray<string | null | undefined> | null | undefined;
      readonly inquireable: boolean | null | undefined;
      readonly majorPeriods: ReadonlyArray<string | null | undefined> | null | undefined;
      readonly offerable: boolean | null | undefined;
      readonly priceRange: string | null | undefined;
      readonly signed: boolean | null | undefined;
      readonly sizes: ReadonlyArray<ArtworkSizes | null | undefined> | null | undefined;
    } | null | undefined;
    readonly keyword: string | null | undefined;
  } | null | undefined;
};
export type fetchArtworkFilterSuggestionsQuery = {
  response: fetchArtworkFilterSuggestionsQuery$data;
  variables: fetchArtworkFilterSuggestionsQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "query"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "query",
        "variableName": "query"
      }
    ],
    "concreteType": "ArtworkFilterSuggestion",
    "kind": "LinkedField",
    "name": "artworkFilterSuggestions",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "keyword",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "fellOpen",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "ArtworkFilterSuggestionFilters",
        "kind": "LinkedField",
        "name": "filters",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "geneIDs",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "sizes",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "colors",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "attributionClass",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "artistNationalities",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "majorPeriods",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "priceRange",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "framed",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "signed",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "forSale",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "acquireable",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "offerable",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "atAuction",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "inquireable",
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "ArtworkFilterSuggestionDropped",
        "kind": "LinkedField",
        "name": "dropped",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "field",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "value",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "fetchArtworkFilterSuggestionsQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "fetchArtworkFilterSuggestionsQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "53b424b38e54770a5f80403316840c30",
    "id": null,
    "metadata": {},
    "name": "fetchArtworkFilterSuggestionsQuery",
    "operationKind": "query",
    "text": "query fetchArtworkFilterSuggestionsQuery(\n  $query: String!\n) {\n  artworkFilterSuggestions(query: $query) {\n    keyword\n    fellOpen\n    filters {\n      geneIDs\n      sizes\n      colors\n      attributionClass\n      artistNationalities\n      majorPeriods\n      priceRange\n      framed\n      signed\n      forSale\n      acquireable\n      offerable\n      atAuction\n      inquireable\n    }\n    dropped {\n      field\n      value\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "4b47183ef4f421cadcbcf992b1000748";

export default node;
