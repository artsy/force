/**
 * @generated SignedSource<<f538b748bc9674a4afb11d4f4ba9cb03>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistStoryIntro_artist$data = {
  readonly biographyBlurb: {
    readonly credit: string | null | undefined;
    readonly text: string | null | undefined;
  } | null | undefined;
  readonly featuredStory: {
    readonly pullQuote: {
      readonly attribution: string | null | undefined;
      readonly text: string;
    } | null | undefined;
  } | null | undefined;
  readonly " $fragmentSpreads": FragmentRefs<"ArtistStoryRepresentation_artist" | "ArtistStylesAndTechniques_artist">;
  readonly " $fragmentType": "ArtistStoryIntro_artist";
};
export type ArtistStoryIntro_artist$key = {
  readonly " $data"?: ArtistStoryIntro_artist$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtistStoryIntro_artist">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "text",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistStoryIntro_artist",
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
      "concreteType": "ArtistBlurb",
      "kind": "LinkedField",
      "name": "biographyBlurb",
      "plural": false,
      "selections": [
        (v0/*: any*/),
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
      "concreteType": "ArtistStory",
      "kind": "LinkedField",
      "name": "featuredStory",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "ArtistStoryQuote",
          "kind": "LinkedField",
          "name": "pullQuote",
          "plural": false,
          "selections": [
            (v0/*: any*/),
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "attribution",
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
      "name": "ArtistStylesAndTechniques_artist"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtistStoryRepresentation_artist"
    }
  ],
  "type": "Artist",
  "abstractKey": null
};
})();

(node as any).hash = "7696eb891e3e15063f21365ce1d49a54";

export default node;
