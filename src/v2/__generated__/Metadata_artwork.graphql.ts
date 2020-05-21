/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Metadata_artwork = {
    readonly href: string | null;
    readonly " $fragmentRefs": FragmentRefs<"Details_artwork" | "Contact_artwork">;
    readonly " $refType": "Metadata_artwork";
};
export type Metadata_artwork$data = Metadata_artwork;
export type Metadata_artwork$key = {
    readonly " $data"?: Metadata_artwork$data;
    readonly " $fragmentRefs": FragmentRefs<"Metadata_artwork">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "Metadata_artwork",
  "type": "Artwork",
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
      "kind": "FragmentSpread",
      "name": "Details_artwork",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "Contact_artwork",
      "args": null
    }
  ]
};
(node as any).hash = '5e64e5a09dbf4016cd89ec6a41b009e5';
export default node;
