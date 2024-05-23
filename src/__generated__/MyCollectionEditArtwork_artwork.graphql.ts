/**
 * @generated SignedSource<<7b6b7df2dbaf0adf144c6de8b172c6b7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MyCollectionEditArtwork_artwork$data = {
  readonly artist: {
    readonly formattedNationalityAndBirthday: string | null | undefined;
    readonly image: {
      readonly cropped: {
        readonly height: number;
        readonly src: string;
        readonly srcSet: string;
        readonly width: number;
      } | null | undefined;
    } | null | undefined;
    readonly initials: string | null | undefined;
    readonly internalID: string;
    readonly isPersonalArtist: boolean | null | undefined;
    readonly name: string | null | undefined;
    readonly targetSupply: {
      readonly isP1: boolean | null | undefined;
    };
  } | null | undefined;
  readonly artistNames: string | null | undefined;
  readonly attributionClass: {
    readonly name: string | null | undefined;
  } | null | undefined;
  readonly category: string | null | undefined;
  readonly collectorLocation: {
    readonly city: string | null | undefined;
    readonly country: string | null | undefined;
    readonly countryCode: string | null | undefined;
    readonly state: string | null | undefined;
  } | null | undefined;
  readonly confidentialNotes: string | null | undefined;
  readonly consignmentSubmission: {
    readonly inProgress: boolean | null | undefined;
  } | null | undefined;
  readonly date: string | null | undefined;
  readonly depth: string | null | undefined;
  readonly dimensions: {
    readonly cm: string | null | undefined;
    readonly in: string | null | undefined;
  } | null | undefined;
  readonly editionNumber: string | null | undefined;
  readonly editionSize: string | null | undefined;
  readonly height: string | null | undefined;
  readonly id: string;
  readonly images: ReadonlyArray<{
    readonly height: number | null | undefined;
    readonly imageURL: string | null | undefined;
    readonly internalID: string | null | undefined;
    readonly isDefault: boolean | null | undefined;
    readonly width: number | null | undefined;
  } | null | undefined> | null | undefined;
  readonly internalID: string;
  readonly isEdition: boolean | null | undefined;
  readonly medium: string | null | undefined;
  readonly metric: string | null | undefined;
  readonly pricePaid: {
    readonly currencyCode: string;
    readonly display: string | null | undefined;
    readonly minor: any;
  } | null | undefined;
  readonly provenance: string | null | undefined;
  readonly slug: string;
  readonly title: string | null | undefined;
  readonly width: string | null | undefined;
  readonly " $fragmentSpreads": FragmentRefs<"MyCollectionArtworkFormMain_artwork">;
  readonly " $fragmentType": "MyCollectionEditArtwork_artwork";
};
export type MyCollectionEditArtwork_artwork$key = {
  readonly " $data"?: MyCollectionEditArtwork_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"MyCollectionEditArtwork_artwork">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "height",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "width",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MyCollectionEditArtwork_artwork",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Artist",
      "kind": "LinkedField",
      "name": "artist",
      "plural": false,
      "selections": [
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "initials",
          "storageKey": null
        },
        (v1/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "formattedNationalityAndBirthday",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "ArtistTargetSupply",
          "kind": "LinkedField",
          "name": "targetSupply",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "isP1",
              "storageKey": null
            }
          ],
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "isPersonalArtist",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "Image",
          "kind": "LinkedField",
          "name": "image",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": [
                {
                  "kind": "Literal",
                  "name": "height",
                  "value": 44
                },
                {
                  "kind": "Literal",
                  "name": "width",
                  "value": 44
                }
              ],
              "concreteType": "CroppedImageUrl",
              "kind": "LinkedField",
              "name": "cropped",
              "plural": false,
              "selections": [
                (v2/*: any*/),
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "src",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "srcSet",
                  "storageKey": null
                },
                (v3/*: any*/)
              ],
              "storageKey": "cropped(height:44,width:44)"
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "ArtworkConsignmentSubmission",
      "kind": "LinkedField",
      "name": "consignmentSubmission",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "inProgress",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "artistNames",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "category",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Money",
      "kind": "LinkedField",
      "name": "pricePaid",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "display",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "minor",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "currencyCode",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "date",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "depth",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "dimensions",
      "kind": "LinkedField",
      "name": "dimensions",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "in",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "cm",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "editionSize",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "editionNumber",
      "storageKey": null
    },
    (v2/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "AttributionClass",
      "kind": "LinkedField",
      "name": "attributionClass",
      "plural": false,
      "selections": [
        (v1/*: any*/)
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Image",
      "kind": "LinkedField",
      "name": "images",
      "plural": true,
      "selections": [
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "isDefault",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "imageURL",
          "storageKey": null
        },
        (v3/*: any*/),
        (v2/*: any*/)
      ],
      "storageKey": null
    },
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isEdition",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "medium",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "metric",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "provenance",
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
      "name": "title",
      "storageKey": null
    },
    (v3/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "confidentialNotes",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "MyLocation",
      "kind": "LinkedField",
      "name": "collectorLocation",
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
          "kind": "ScalarField",
          "name": "state",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "country",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "countryCode",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "MyCollectionArtworkFormMain_artwork"
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};
})();

(node as any).hash = "8af37a3034bbaf3fed88307722f0e76d";

export default node;
