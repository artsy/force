/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PartnerArtistDetails_partnerArtist = {
    readonly biographyBlurb: {
        readonly text: string | null;
        readonly credit: string | null;
    } | null;
    readonly node: {
        readonly slug: string;
        readonly name: string | null;
        readonly href: string | null;
        readonly formattedNationalityAndBirthday: string | null;
        readonly " $fragmentRefs": FragmentRefs<"FollowArtistButton_artist">;
    } | null;
    readonly " $fragmentRefs": FragmentRefs<"PartnerArtistArtworksRail_partnerArtist">;
    readonly " $refType": "PartnerArtistDetails_partnerArtist";
};
export type PartnerArtistDetails_partnerArtist$data = PartnerArtistDetails_partnerArtist;
export type PartnerArtistDetails_partnerArtist$key = {
    readonly " $data"?: PartnerArtistDetails_partnerArtist$data;
    readonly " $fragmentRefs": FragmentRefs<"PartnerArtistDetails_partnerArtist">;
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
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "FollowArtistButton_artist"
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PartnerArtistArtworksRail_partnerArtist"
    }
  ],
  "type": "ArtistPartnerEdge",
  "abstractKey": null
};
(node as any).hash = 'f070ad2ab63ddc54cae550761f2cde60';
export default node;
