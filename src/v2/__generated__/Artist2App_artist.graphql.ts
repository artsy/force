/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Artist2App_artist = {
    readonly internalID: string;
    readonly name: string | null;
    readonly slug: string;
    readonly " $fragmentRefs": FragmentRefs<"Artist2Meta_artist" | "Artist2Header_artist" | "BackLink_artist">;
    readonly " $refType": "Artist2App_artist";
};
export type Artist2App_artist$data = Artist2App_artist;
export type Artist2App_artist$key = {
    readonly " $data"?: Artist2App_artist$data;
    readonly " $fragmentRefs": FragmentRefs<"Artist2App_artist">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Artist2App_artist",
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
      "name": "name",
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
      "args": null,
      "kind": "FragmentSpread",
      "name": "Artist2Meta_artist"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Artist2Header_artist"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "BackLink_artist"
    }
  ],
  "type": "Artist"
};
(node as any).hash = 'c63140cf5d39d5154d8780bfa2c15a46';
export default node;
