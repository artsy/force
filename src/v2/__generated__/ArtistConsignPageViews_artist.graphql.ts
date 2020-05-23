/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtistConsignPageViews_artist = {
    readonly name: string | null;
    readonly targetSupply: {
        readonly microfunnel: {
            readonly metadata: {
                readonly roundedViews: string | null;
                readonly roundedUniqueVisitors: string | null;
            } | null;
        } | null;
    } | null;
    readonly " $refType": "ArtistConsignPageViews_artist";
};
export type ArtistConsignPageViews_artist$data = ArtistConsignPageViews_artist;
export type ArtistConsignPageViews_artist$key = {
    readonly " $data"?: ArtistConsignPageViews_artist$data;
    readonly " $fragmentRefs": FragmentRefs<"ArtistConsignPageViews_artist">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "ArtistConsignPageViews_artist",
  "type": "Artist",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "name",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "targetSupply",
      "storageKey": null,
      "args": null,
      "concreteType": "ArtistTargetSupply",
      "plural": false,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "microfunnel",
          "storageKey": null,
          "args": null,
          "concreteType": "ArtistTargetSupplyMicrofunnel",
          "plural": false,
          "selections": [
            {
              "kind": "LinkedField",
              "alias": null,
              "name": "metadata",
              "storageKey": null,
              "args": null,
              "concreteType": "TargetSupplyMicrofunnelMetadata",
              "plural": false,
              "selections": [
                {
                  "kind": "ScalarField",
                  "alias": null,
                  "name": "roundedViews",
                  "args": null,
                  "storageKey": null
                },
                {
                  "kind": "ScalarField",
                  "alias": null,
                  "name": "roundedUniqueVisitors",
                  "args": null,
                  "storageKey": null
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
(node as any).hash = 'cb356e907f92e5bad02e30c7e4377123';
export default node;
