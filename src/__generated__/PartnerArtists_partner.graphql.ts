/**
 * @generated SignedSource<<22d0b8d04b8b21d296387b9ce12ba60d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PartnerArtists_partner$data = {
  readonly allArtistsConnection: {
    readonly edges: ReadonlyArray<{
      readonly " $fragmentSpreads": FragmentRefs<"PartnerArtistList_artists">;
    } | null> | null;
  } | null;
  readonly displayFullPartnerPage: boolean | null;
  readonly distinguishRepresentedArtists: boolean | null;
  readonly slug: string;
  readonly " $fragmentType": "PartnerArtists_partner";
};
export type PartnerArtists_partner$key = {
  readonly " $data"?: PartnerArtists_partner$data;
  readonly " $fragmentSpreads": FragmentRefs<"PartnerArtists_partner">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PartnerArtists_partner",
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
      "name": "distinguishRepresentedArtists",
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
      "args": [
        {
          "kind": "Literal",
          "name": "displayOnPartnerProfile",
          "value": true
        },
        {
          "kind": "Literal",
          "name": "hasNotRepresentedArtistWithPublishedArtworks",
          "value": true
        }
      ],
      "concreteType": "ArtistPartnerConnection",
      "kind": "LinkedField",
      "name": "allArtistsConnection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "ArtistPartnerEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "PartnerArtistList_artists"
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "allArtistsConnection(displayOnPartnerProfile:true,hasNotRepresentedArtistWithPublishedArtworks:true)"
    }
  ],
  "type": "Partner",
  "abstractKey": null
};

(node as any).hash = "97f0c19fd11767d96b88ed011f8ebf9d";

export default node;
