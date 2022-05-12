/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Overview_partner = {
    readonly slug: string;
    readonly partnerType: string | null;
    readonly displayFullPartnerPage: boolean | null;
    readonly profileBannerDisplay: string | null;
    readonly displayArtistsSection: boolean | null;
    readonly locationsConnection: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly city: string | null;
                readonly coordinates: {
                    readonly lat: number | null;
                    readonly lng: number | null;
                } | null;
            } | null;
        } | null> | null;
    } | null;
    readonly " $fragmentRefs": FragmentRefs<"AboutPartner_partner" | "ShowsRail_partner" | "ArtistsRail_partner" | "SubscriberBanner_partner" | "ArticlesRail_partner">;
    readonly " $refType": "Overview_partner";
};
export type Overview_partner$data = Overview_partner;
export type Overview_partner$key = {
    readonly " $data"?: Overview_partner$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"Overview_partner">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Overview_partner",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "partnerType",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "displayFullPartnerPage",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "profileBannerDisplay",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "displayArtistsSection",
      "storageKey": null
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 1
        }
      ],
      "concreteType": "LocationConnection",
      "kind": "LinkedField",
      "name": "locationsConnection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "LocationEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "Location",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "city",
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
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "locationsConnection(first:1)"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "AboutPartner_partner"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ShowsRail_partner"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtistsRail_partner"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SubscriberBanner_partner"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArticlesRail_partner"
    }
  ],
  "type": "Partner",
  "abstractKey": null
};
(node as any).hash = '4e1d8553d209e9165110e72fba323106';
export default node;
