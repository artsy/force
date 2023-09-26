/**
 * @generated SignedSource<<e8e909537a6bf3e8effe7a06a50ca3a9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistCareerHighlight_insight$data = {
  readonly description: string | null;
  readonly entities: ReadonlyArray<string>;
  readonly label: string;
  readonly " $fragmentType": "ArtistCareerHighlight_insight";
};
export type ArtistCareerHighlight_insight$key = {
  readonly " $data"?: ArtistCareerHighlight_insight$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtistCareerHighlight_insight">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistCareerHighlight_insight",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "label",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "entities",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "description",
      "storageKey": null
    }
  ],
  "type": "ArtistInsight",
  "abstractKey": null
};

(node as any).hash = "5e3af9da6038a7a9644ee7fbd859f17f";

export default node;
