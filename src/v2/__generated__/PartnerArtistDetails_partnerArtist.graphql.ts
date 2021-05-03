/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PartnerArtistDetails_partnerArtist = {
    readonly biographyBlurb: {
        readonly text: string | null;
        readonly credit: string | null;
    } | null;
    readonly node: {
        readonly name: string | null;
        readonly href: string | null;
        readonly formattedNationalityAndBirthday: string | null;
        readonly filterArtworksConnection: {
            readonly edges: ReadonlyArray<{
                readonly node: {
                    readonly id: string;
                    readonly " $fragmentRefs": FragmentRefs<"FillwidthItem_artwork">;
                } | null;
            } | null> | null;
        } | null;
        readonly " $fragmentRefs": FragmentRefs<"FollowArtistButton_artist">;
    } | null;
    readonly " $refType": "PartnerArtistDetails_partnerArtist";
};
export type PartnerArtistDetails_partnerArtist$data = PartnerArtistDetails_partnerArtist;
export type PartnerArtistDetails_partnerArtist$key = {
    readonly " $data"?: PartnerArtistDetails_partnerArtist$data;
    readonly " $fragmentRefs": FragmentRefs<"PartnerArtistDetails_partnerArtist">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "kind": "RootArgument",
      "name": "partnerId",
      "type": "String"
    }
  ],
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
          "alias": null,
          "args": [
            {
              "kind": "Literal",
              "name": "first",
              "value": 12
            },
            {
              "items": [
                {
                  "kind": "Variable",
                  "name": "partnerIDs.0",
                  "variableName": "partnerId"
                }
              ],
              "kind": "ListValue",
              "name": "partnerIDs"
            }
          ],
          "concreteType": "FilterArtworksConnection",
          "kind": "LinkedField",
          "name": "filterArtworksConnection",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "FilterArtworksEdge",
              "kind": "LinkedField",
              "name": "edges",
              "plural": true,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "Artwork",
                  "kind": "LinkedField",
                  "name": "node",
                  "plural": false,
                  "selections": [
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "id",
                      "storageKey": null
                    },
                    {
                      "args": null,
                      "kind": "FragmentSpread",
                      "name": "FillwidthItem_artwork"
                    }
                  ],
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "FollowArtistButton_artist"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "ArtistPartnerEdge"
};
(node as any).hash = 'ba9c64f322825e146cd87ea5cd3c97ea';
export default node;
