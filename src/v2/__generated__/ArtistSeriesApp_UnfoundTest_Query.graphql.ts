/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtistSeriesApp_UnfoundTest_QueryVariables = {
    slug: string;
};
export type ArtistSeriesApp_UnfoundTest_QueryResponse = {
    readonly artistSeries: {
        readonly " $fragmentRefs": FragmentRefs<"ArtistSeriesApp_artistSeries">;
    } | null;
};
export type ArtistSeriesApp_UnfoundTest_QueryRawResponse = {
    readonly artistSeries: ({
        readonly title: string;
        readonly description: string | null;
    }) | null;
};
export type ArtistSeriesApp_UnfoundTest_Query = {
    readonly response: ArtistSeriesApp_UnfoundTest_QueryResponse;
    readonly variables: ArtistSeriesApp_UnfoundTest_QueryVariables;
    readonly rawResponse: ArtistSeriesApp_UnfoundTest_QueryRawResponse;
};



/*
query ArtistSeriesApp_UnfoundTest_Query(
  $slug: ID!
) {
  artistSeries(id: $slug) {
    ...ArtistSeriesApp_artistSeries
  }
}

fragment ArtistSeriesApp_artistSeries on ArtistSeries {
  ...ArtistSeriesHeader_artistSeries
}

fragment ArtistSeriesHeader_artistSeries on ArtistSeries {
  title
  description
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "slug",
    "type": "ID!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "slug"
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "ArtistSeriesApp_UnfoundTest_Query",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artistSeries",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "ArtistSeries",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "ArtistSeriesApp_artistSeries",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "ArtistSeriesApp_UnfoundTest_Query",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artistSeries",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "ArtistSeries",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "title",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "description",
            "args": null,
            "storageKey": null
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "ArtistSeriesApp_UnfoundTest_Query",
    "id": null,
    "text": "query ArtistSeriesApp_UnfoundTest_Query(\n  $slug: ID!\n) {\n  artistSeries(id: $slug) {\n    ...ArtistSeriesApp_artistSeries\n  }\n}\n\nfragment ArtistSeriesApp_artistSeries on ArtistSeries {\n  ...ArtistSeriesHeader_artistSeries\n}\n\nfragment ArtistSeriesHeader_artistSeries on ArtistSeries {\n  title\n  description\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = 'f6f14e625bd96fdfefd5d230b5070c95';
export default node;
