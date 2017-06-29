## withNicome  

### ニコフレ(friends.nico)用Web Extension  


* これなに？  
ニコニコのマストドン用Web Extensionです。  
[ニコニコ形式](https://friends.nico/nicomment)のコメントエリアで動画を再生します。  
コメントスクロール部分がドラッグ・アンド・ドロップ可能になっています。  
再生したい動画・音声ファイルをドロップすることで再生を開始できます。  
画像の場合背景として設定されます。  
[こんな感じ](https://friends.nico/@12/20759579)。  
ニコ動の動画はHTTPS化したら付けるかも知れないです[(混在コンテンツ)](https://friends.nico/@12/19593249)。  


* パッケージ化  
`$ zip -r addon.xpi icons/ js/ manifest.json`


* 動作確認環境  
OS: Xubuntu 16.04 LTS  
ブラウザ: Firefox 最新版(Canonical版)  


* ライセンス  
GNU General Public License v3.0  
