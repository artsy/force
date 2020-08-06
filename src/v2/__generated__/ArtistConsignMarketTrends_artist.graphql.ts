/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtistConsignMarketTrends_artist = {
    readonly href: string | null;
    readonly targetSupply: {
        readonly microfunnel: {
            readonly metadata: {
                readonly highestRealized: string | null;
                readonly str: string | null;
                readonly realized: string | null;
            } | null;
        } | null;
    } | null;
    readonly " $refType": "ArtistConsignMarketTrends_artist";
};
export type ArtistConsignMarketTrends_artist$data = ArtistConsignMarketTrends_artist;
export type ArtistConsignMarketTrends_artist$key = {
    readonly " $data"?: ArtistConsignMarketTrends_artist$data;
    readonly " $fragmentRefs": FragmentRefs<"ArtistConsignMarketTrends_artist">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "ArtistConsignMarketTrends_artist",
  "type": "Artist",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "href",
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
                  "name": "highestRealized",
                  "args": null,
                  "storageKey": null
                },
                {
                  "kind": "ScalarField",
                  "alias": null,
                  "name": "str",
                  "args": null,
                  "storageKey": null
                },
                {
                  "kind": "ScalarField",
                  "alias": null,
                  "name": "realized",
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
(node as any).hash = '91c1ebf56415fcb86b69ff9fa6f2a918';
export default node;
