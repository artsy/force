/**
 * @generated SignedSource<<83309a18563935a8a14419650a9ed745>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PartnerArtistDetails_partnerArtist$data = {
  readonly biographyBlurb: {
    readonly credit: string | null;
    readonly text: string | null;
  } | null;
  readonly node: {
    readonly formattedNationalityAndBirthday: string | null;
    readonly href: string | null;
    readonly internalID: string;
    readonly name: string | null;
    readonly slug: string;
  } | null;
  readonly " $fragmentSpreads": FragmentRefs<"PartnerArtistArtworksRail_partnerArtist">;
  readonly " $fragmentType": "PartnerArtistDetails_partnerArtist";
};
export type PartnerArtistDetails_partnerArtist$key = {
  readonly " $data"?: PartnerArtistDetails_partnerArtist$data;
  readonly " $fragmentSpreads": FragmentRefs<"PartnerArtistDetails_partnerArtist">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PartnerArtistDetails_partnerArtist",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "format",
          "value": "HTML"
        }
      ],
      "concreteType": "PartnerArtistBlurb",
      "kind": "LinkedField",
      "name": "biographyBlurb",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "text",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "credit",
          "storageKey": null
        }
      ],
      "storageKey": "biographyBlurb(format:\"HTML\")"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PartnerArtistArtworksRail_partnerArtist"
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Artist",
      "kind": "LinkedField",
      "name": "node",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "internalID",
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
          "name": "href",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "formattedNationalityAndBirthday",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "ArtistPartnerEdge",
  "abstractKey": null
};

(node as any).hash = "2f51b36b34ce99bdf0f438ac94c1e7bd";

export default node;
